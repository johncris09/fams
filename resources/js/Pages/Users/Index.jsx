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
import { DataTable } from "@/Components/user/data-table";
import { getColumns } from "@/Components/user/columns";
import { Button } from "@/Components/ui/button";
import { toast } from "react-toastify";
import FormModal from "@/Components/user/FormModal";
const TITLE = "User";

export default function Index({ auth }) {
  const { users, filters} = usePage().props;
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
        toast.success(`${TITLE} deleted successfully`);
        setShowDeleteDialog(false);
        setSelectedData(null);
      },
    });
  };
  const columns = useMemo(
    () => getColumns(auth, handleOpenModal, handleShowDeleteDialog),
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
            auth={auth}
            columns={columns}
            data={users.data}
            filters={filters}
            meta={users.meta}
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
              Are you sure you want to delete the {`${TITLE}`}? This action cannot be
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
              Delete {`${TITLE}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthenticatedLayout>
  );
}
