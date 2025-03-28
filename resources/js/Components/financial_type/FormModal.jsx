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
  const { errors } = usePage().props;
  const { data, setData, post, processing, reset, patch } = useForm({
    type: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    if (selectedData) {
      setData({
        amount: selectedData.amount || "",
        type: selectedData.type || "",
        description: selectedData.description || "",
      });
    } else {
      reset();
    }
  }, [selectedData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedData) {
      patch(route("financial_types.update", selectedData.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`${title} updated successfully!`);
          onClose();
        },
        onError: (errors) => console.error(errors),
      });
    } else {
      post(route("financial_types.store"), {
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
                <Label htmlFor="type">Type</Label>
                <Input
                  type="text"
                  id="type"
                  label="Type"
                  value={data.type}
                  placeholder="Type"
                  onChange={(e) => setData("type", e.target.value)}
                />
 <InputError message={errors.type} className="mt-2" />

                    </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  type="number"
                  id="amount"
                  label="Amount"
                  value={data.amount}
                  placeholder="Amount"
                  onChange={(e) => setData("amount", e.target.value)}
                />

<InputError message={errors.amount} className="mt-2" />
                  </div>
              <div>
                <Label htmlFor="description">Description</Label>

                <Input
                  type="text"
                  id="description"
                  label="Description"
                  value={data.description}
                  placeholder="Description"
                  onChange={(e) => setData("description", e.target.value)}
                />
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
