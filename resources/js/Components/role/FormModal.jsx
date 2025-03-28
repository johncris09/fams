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
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import InputError from "@/Components/InputError";

const FormModal = ({ title, isOpen, onClose, selectedData }) => {
  const { errors, permissions } = usePage().props;
  const { data, setData, post, processing, reset, patch } = useForm({
    name: "",
    permissions: [],
  });

  useEffect(() => {
    if (selectedData) {
      setData({
        name: selectedData.name || "",
        permissions: selectedData.permissions
          ? selectedData.permissions.map((p) => p.name)
          : [], // Ensure permissions are mapped as an array of names
      });
    } else {
      reset();
    }
  }, [selectedData, isOpen]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedData) {
      patch(route("roles.update", selectedData.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`${title} updated successfully!`);
          onClose();
        },
        onError: (errors) => console.error(errors),
      });
    } else {
      post(route("roles.store"), {
        onSuccess: () => {
          toast.success(`{title} created successfully!`);
          onClose();
        },
      });
    }
  };
  return (
    <>
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  label="Name"
                  value={data.name}
                  placeholder="Name"
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="permission">Permission</Label>
                {permissions.map((permission) => (
                  <div key={permission.id}>
                    <label>
                      <input
                        type="checkbox"
                        name="permissions[]"
                        value={permission.name}
                        checked={data.permissions.includes(permission.name)} // Now correctly pre-checked
                        onChange={(e) => {
                          if (e.target.checked) {
                            // Append permission when checked
                            setData("permissions", [
                              ...data.permissions,
                              permission.name,
                            ]);
                          } else {
                            // Remove permission when unchecked
                            setData(
                              "permissions",
                              data.permissions.filter(
                                (p) => p !== permission.name
                              )
                            );
                          }
                        }}
                        className="mr-2"
                      />
                      {permission.name}
                    </label>
                  </div>
                ))}
                <InputError message={errors.permission} className="mt-2" />
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
                      <Loader2Icon className="mr-2 w-4 h-4 animate-spin" />{" "}
                      Updating...
                    </>
                  ) : (
                    <>
                      <Loader2Icon className="mr-2 w-4 h-4 animate-spin" />{" "}
                      Saving...
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
