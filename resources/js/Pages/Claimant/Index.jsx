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
import { DataTable } from "@/Components/claimant/data-table";
import { getColumns } from "@/Components/claimant/columns";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FormModal from "@/Components/claimant/FormModal";
const TITLE = "Claimant";
export default function Index({ auth }) {
  const { toast } = useToast();
  const { claimants, filters } = usePage().props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(null);

  const handleOpenModal = (claimant = null) => {
    router.reload({ only: [] });
    setSelectedData(claimant);
    setModalOpen(true);
  };
  const handleShowDeleteDialog = (claimant = null) => {
    setShowDeleteDialog(true);
    setSelectedData(claimant);
  };

  const handleDelete = () => {
    router.delete(route("claimants.destroy", selectedData.id), {
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
            data={claimants.data}
            filters={filters}
            meta={claimants.meta}
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
        claimant={selectedData}
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
