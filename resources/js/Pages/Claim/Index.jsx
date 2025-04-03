import { useEffect, useMemo, useRef, useState } from "react";
import reportTemplate from "./../../template/FinancialAssistanceVoucherTemplate.xlsx";
import XlsxPopulate, { RichText } from "xlsx-populate/browser/xlsx-populate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import { Card, CardContent } from "@mui/material";
import { DataTable } from "@/Components/claim/data-table";
import { getColumns } from "@/Components/claim/columns";
import { Button } from "@/Components/ui/button";
import FormModal from "@/Components/claim/FormModal";
import StatCard from "../Dashboard/StatCard";
import { Female, FemaleRounded, Male, MaleRounded } from "@mui/icons-material";
import PrintModal from "@/Components/claim/PrintModal";
import { useToast } from "@/hooks/use-toast";
const TITLE = "Claim";

export default function Index({ auth }) {
  const { toast } = useToast();
  const { claims,filters,  claimantsByGender } = usePage().props;


  const componentRef = useRef(null); // Reference to the component

  const [isModalOpen, setModalOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(null);

  const handleOpenModal = (data = null) => {
    router.reload({ only: [] });
    setSelectedData(data);
    setModalOpen(true);
  };
  function calculateAge(birthdate) {
    const birth = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    // Adjust if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }
  const handlePrintTemplate = (data = null) => {
    fetch(reportTemplate)
      .then((response) => response.arrayBuffer()) // Convert file to ArrayBuffer
      .then((buffer) => XlsxPopulate.fromDataAsync(buffer)) // Load workbook
      .then((workbook) => {
        const sheet = workbook.sheet("Sheet1"); // Select sheet

        let claimant_name = `${data.claimant.first_name} ${
          data.claimant.middle_name || ""
        } ${data.claimant.last_name} ${data.claimant.suffix || ""}`
          .replace(/\s+/g, " ")
          .trim();

        sheet.cell(`E8`).value(claimant_name);
        sheet.cell(`D9`).value(data.claimant.gender);
        sheet.cell(`F9`).value(data.claimant.marital_status);
        sheet.cell(`I9`).value(calculateAge(data.claimant.birthdate));
        sheet
          .cell(`E10`)
          .value(`${data.purok}, ${data.barangay.barangay}, Oroquieta City`);

        const cell = sheet.cell("A14");
        cell.value(new RichText());

        // add two rich text fragments
        cell
          .value()
          .add(
            " To payment of financial assistance  to the above-named claimant for"
          )
          .add(` ${data.purpose},`, {
            bold: true,
            italic: true,
            underline: true,
            fontSize: 12,
          })
          .add(
            " per supporting papers here to attached or in the amount of . . ."
          );

        sheet
          .cell(`L4`)
          .value(
            `${data?.app_year}-${data?.app_month
              ?.toString()
              .padStart(2, "0")}-${data?.control_number
              ?.toString()
              .padStart(4, "0")}`
          );
        sheet.cell(`L5`).value(
          (() => {
            const dateString = data.claim_date;
            const date = new Date(dateString);

            const options = { year: "numeric", month: "long", day: "numeric" };
            const formattedDate = date.toLocaleDateString("en-US", options);

            return formattedDate;
          })()
        );
        sheet.cell(`G18`).value(data.amount);
        sheet.cell(`D30`).value(claimant_name);
        sheet.cell(`D45`).value(claimant_name);
        sheet.cell(`I45`).value(claimant_name);

        sheet.cell(`D34`).value("WELITA C. LARA");
        sheet.cell(`D35`).value("Executive Assistant IV");

        sheet.cell(`D41`).value("HAIDE M. GALIMBAS");
        sheet.cell(`I34`).value("HAIDE M. GALIMBAS");

        // Export the modified file
        return workbook.outputAsync();
      })
      .then((updatedBuffer) => {
        const now = new Date();

        // Get local date and time components
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        // Format the filename
        const filename = `FinancialAssistanceVoucher ${year}-${month}-${day} ${hours}:${minutes}:${seconds}.xlsx`;


        // Create a downloadable link
        const blob = new Blob([updatedBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        // Create a download link
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up
      })
      .catch((error) => console.error("Error processing Excel file:", error));
  };

  const handleShowDeleteDialog = (data = null) => {
    setShowDeleteDialog(true);
    setSelectedData(data);
  };
  const handleDelete = () => {
    router.delete(route("claims.destroy", selectedData.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          description: `${TITLE} deleted successfully`,
        });
        setShowDeleteDialog(false);
        setSelectedData(null);
      },
    });
  };
  const columns = useMemo(
    () =>
      getColumns(handlePrintTemplate, handleOpenModal, handleShowDeleteDialog),
    []
  );

  return (
    <AuthenticatedLayout auth_user={auth.user} header="Users">
      <Head title={`${TITLE}s`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
        <StatCard
          title="Female"
          description="Total Female"
          value={claimantsByGender.female}
          icon={<FemaleRounded className="h-5 w-5 text-primary" />}
          gradientFrom="blue"
          gradientTo="blue"
        />
        <StatCard
          title="Male"
          description="Total Male"
          value={claimantsByGender.male}
          icon={<Male className="h-5 w-5 text-primary" />}
          gradientFrom="red"
          gradientTo="red"
        />
      </div>
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{`${TITLE}`}s</h1>
          </div>
          <DataTable
            columns={columns}
            data={claims.data}
            filters={filters}
            meta={claims.meta}
            onEdit={handleOpenModal}
            onAdd={handleOpenModal}
          />
        </CardContent>
      </Card>
      <FormModal
        toast={toast}
        isOpen={isModalOpen}
        onClose={() => {
          router.reload({ only: [] });
          setModalOpen(false);
        }}
        selectedData={selectedData}
        title={`${TITLE}`}
      />

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Selected {`${TITLE}`}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the {`${TITLE}`}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete {`${TITLE}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthenticatedLayout>
  );
}
