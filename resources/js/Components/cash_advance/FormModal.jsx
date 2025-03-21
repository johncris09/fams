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

const FormModal = ({ title, isOpen, onClose, selectedData }) => {
  const { errors } = usePage().props;
  const { data, setData, post, processing, reset, patch } = useForm({
    amount: "",
    date_added: "",
  });

  useEffect(() => {
    if (selectedData) {
      setData({
        amount: selectedData.amount || "",
        date_added: selectedData.date_added || "",
      });
    } else {
      reset();
    }
  }, [selectedData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedData) {
      patch(route("cash_advances.update", selectedData.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`${title} updated successfully!`);
          onClose();
        },
        onError: (errors) => console.error(errors),
      });
    } else {
      post(route("cash_advances.store"), {
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
                <Label htmlFor="last-name">Date Added</Label>
                <Input
                  type="date"
                  label="Date Added"
                  value={data.date_added}
                  placeholder="Date Added"
                  onChange={(e) => setData("date_added", e.target.value)}
                />
                {errors.date_added && (
                  <p className="text-red-500"> {errors.date_added}</p>
                )}
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  label="Amount"
                  value={data.amount}
                  placeholder="Amount"
                  onChange={(e) => setData("amount", e.target.value)}
                />

                {errors.amount && (
                  <p className="text-red-500"> {errors.amount}</p>
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
