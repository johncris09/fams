import InputError from "@/Components/InputError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const FormModal = ({ toast, title, isOpen, onClose, selectedData }) => {
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

    if (selectedData) {
      patch(route("claimants.update", selectedData.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast({
            description: `${title} updated successfully`,
          });
          onClose();
        },
      });
    } else {
      post(route("claimants.store"), {
        onSuccess: () => {
          toast({
            description: `${title} created successfully`,
          });
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
                <InputError message={errors.last_name} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  label="First Name"
                  value={data.first_name}
                  placeholder="First Name"
                  onChange={(e) => setData("first_name", e.target.value)}
                />

                <InputError message={errors.first_name} className="mt-2" />
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

                <InputError message={errors.birthdate} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  id="gender"
                  value={data.gender}
                  name="gender"
                  onValueChange={(value) => setData("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <InputError message={errors.gender} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="marital-status">Marital Status</Label>
                <Select
                  id="marital_status"
                  value={data.marital_status}
                  name="marital_status"
                  onValueChange={(value) => setData("marital_status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Marital Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
                <InputError message={errors.marital_status} className="mt-2" />
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
