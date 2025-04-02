import { useEffect, useMemo, useState } from "react";

import { Users2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
const TITLE = "Claim";

export default function Index({ auth }) {
  const { claims, flash, claimantsByGender } = usePage().props;
  const { toast } = useToast();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(null);

  const handleOpenModal = (data = null) => {
    router.reload({ only: [] });
    setSelectedData(data);
    setModalOpen(true);
  };
  const handleShowDeleteDialog = (data = null) => {
    setShowDeleteDialog(true);
    setSelectedData(data);
  };
  const handleDelete = () => {
    router.delete(route("claims.destroy", selectedData.id), {
      preserveScroll: true,
      onSuccess: () => {
        setShowDeleteDialog(false);
        setSelectedData(null);
      },
    });
  };
  const columns = useMemo(
    () => getColumns(handleOpenModal, handleShowDeleteDialog),
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
          icon={<FemaleRounded className="h-5 w-5 text-white" />}
          gradientFrom="blue"
          gradientTo="blue"
        />
        <StatCard
          title="Female"
          description="Total Female"
          value={claimantsByGender.male}
          icon={<Male className="h-5 w-5 text-white" />}
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
            data={claims}
            onEdit={handleOpenModal}
            onAdd={handleOpenModal}
          />
        </CardContent>
      </Card>
      <FormModal
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
