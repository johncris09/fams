import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Loader2Icon, UserIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

const FormModal = ({ title, isOpen, onClose, selectedData }) => {
  const { errors } = usePage().props;
  const { data, setData, post, processing, reset, patch } = useForm({
    first_name: "",
    last_name: "",
    middle_name: "",
    suffix: "",
    birthdate: "",
    gender: "",
    marital_status: "",
  });

  useEffect(() => {
    if (selectedData) {
      setData({
        last_name: selectedData.lastName || "",
        first_name: selectedData.firstName || "",
        middle_name: selectedData.middleName || "",
        suffix: selectedData.suffix || "",
        birthdate: selectedData.birthdate || "",
        gender: selectedData.gender || "",
        marital_status: selectedData.maritalStatus || "",
      });
    } else {
      reset();
    }
  }, [selectedData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (claimant) {
      patch(route("claimants.update", selectedData.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`${title} updated successfully!`);
          onClose();
        },
        onError: (errors) => console.error(errors),
      });
    } else {
      post(route("claimants.store"), {
        onSuccess: () => {
          toast.success(`${title} created successfully!`);
          onClose();
        },
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedData ? `Edit ${title}` : `Add ${title}`}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  type="text"
                  label="Last Name"
                  value={data.last_name}
                  placeholder="Last Name"
                  onChange={(e) => setData("last_name", e.target.value)}
                />
                {errors.last_name && (
                  <p className="text-red-500"> {errors.last_name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  label="First Name"
                  value={data.first_name}
                  placeholder="First Name"
                  onChange={(e) => setData("first_name", e.target.value)}
                />

                {errors.first_name && (
                  <p className="text-red-500"> {errors.first_name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="middle-name">Middle Name (Optional)</Label>

                <Input
                  type="text"
                  id="middle-name"
                  value={data.middle_name}
                  placeholder="Middle Name (Optional)"
                  onChange={(e) => setData("middle_name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="suffix">Suffix (Optional)</Label>
                <Input
                  type="text"
                  id="suffix"
                  label="Suffix (Optional)"
                  value={data.suffix}
                  placeholder="Suffix (Optional)"
                  onChange={(e) => setData("suffix", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="birthdate">Birthdate</Label>
                <Input
                  type="date"
                  id="birthdate"
                  label="Birthdate"
                  value={data.birthdate}
                  placeholder="Birthdate"
                  onChange={(e) => setData("birthdate", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Input
                  type="text"
                  id="gender"
                  label="Gender"
                  value={data.gender}
                  placeholder="Gender"
                  onChange={(e) => setData("gender", e.target.value)}
                />
                {errors.gender && (
                  <p className="text-red-500"> {errors.gender}</p>
                )}
              </div>
              <div>
                <Label htmlFor="marital-status">Marital Status</Label>
                <Input
                  type="text"
                  id="marital-status"
                  label="Marital Status"
                  value={data.marital_status}
                  placeholder="Marital Status"
                  onChange={(e) => setData("marital_status", e.target.value)}
                />
                {errors.marital_status && (
                  <p className="text-red-500"> {errors.marital_status}</p>
                )}
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? (
                  selectedData ? (
                    <>
                      <Loader2Icon className="animate-spin" /> Updating...
                    </>
                  ) : (
                    <>
                      <Loader2Icon className="animate-spin" /> Saving...
                    </>
                  )
                ) : selectedData ? (
                  `Update ${title}`
                ) : (
                  `Create ${title}`
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormModal;
