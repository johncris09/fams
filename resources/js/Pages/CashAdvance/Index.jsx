"use client";

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
import { useMemo, useState } from "react";
import { Card, CardContent } from "@mui/material";
import { DataTable } from "@/Components/cash_advance/data-table";
import { getColumns } from "@/Components/cash_advance/columns";
import { Button } from "@/Components/ui/button";
import {  toast } from 'react-toastify'
import FormModal from "@/Components/cash_advance/FormModal";
const TITLE = "Cash Advance";

export default function Index({ auth }) {
  const { cashAdvances } = usePage().props;
  console.info(cashAdvances)
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
    router.delete(route("patients.destroy", selectedData.id), {
      preserveScroll: true,
      onSuccess: () => {
              toast.success(`${TITLE} deleted successfully` );
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

      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{`${TITLE}`}s</h1>
          </div>
          <DataTable
            columns={columns}
            data={cashAdvances.data}
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
            <DialogTitle>Delete Selected Users</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the user? This action cannot be
              undone.
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
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthenticatedLayout>
  );
}
