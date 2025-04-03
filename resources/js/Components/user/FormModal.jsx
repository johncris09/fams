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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

const FormModal = ({ title, isOpen, onClose, selectedData }) => {
  const { errors, roles } = usePage().props;

  const { data, setData, post, processing, reset, patch } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
    avatar: {},
  });
  useEffect(() => {
    if (selectedData) {
      setData({
        name: selectedData.name || "",
        email: selectedData.email || "",
        password: selectedData.password || "",
        avatar: selectedData.avatar || "",
        role: Array.isArray(selectedData.roles) ? selectedData.roles[0] : "",
      });
    } else {
      reset();
    }
  }, [selectedData, isOpen]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedData) {
      patch(route("users.update", selectedData.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`${title} updated successfully!`);
          onClose();
        },
        onError: (errors) => console.error(errors),
      });
    } else {
      post(route("users.store"), {
        onSuccess: () => {
          toast.success(`${title} created successfully!`);
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
                  label="Name"
                  value={data.name}
                  placeholder="Name"
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="text"
                  label="Email"
                  value={data.email}
                  placeholder="Email"
                  onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />
              </div>
              <div>
                <Label className="text-primary" htmlFor="file">
                  Upload profile picture
                </Label>
                <Input
                  className="mt-1"
                  id="avatar"
                  type="file"
                  onChange={(e) => {
                    let files = e.target.files?.[0];
                    setData("avatar", files);
                  }}
                />

                <InputError message={errors.avatar} className="mt-2" />
              </div>
              {!selectedData && (
                <>
                  <div className="mt-4">
                    <Label className="text-primary" htmlFor="password">
                      Password
                    </Label>
                    <Input
                      className="mt-1"
                      name="password"
                      id="password"
                      type="password"
                      value={data.password}
                      onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                  </div>

                  <div className="mt-4">
                    <Label
                      className="text-primary"
                      htmlFor="password_confirmation"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      className="mt-1"
                      id="password_confirmation"
                      type="password"
                      value={data.password_confirmation}
                      onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                      }
                    />
                    <InputError
                      message={errors.password_confirmation}
                      className="mt-2"
                    />
                  </div>
                </>
              )}
              <div className="mt-4">
                <Label className="text-primary" htmlFor="role">
                  Role
                </Label>
                <Select
                  name="role"
                  value={data.role}
                  onValueChange={(value) => setData("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputError message={errors.role} className="mt-2" />
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
