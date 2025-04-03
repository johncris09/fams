"use client";
import { useState } from "react";
import InputError from "@/Components/InputError";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Loader2Icon } from "lucide-react";
import { Textarea } from "../ui/textarea";

const FormModal = ({ toast, title, isOpen, onClose, selectedData }) => {
  const [openPatient, setOpenPatient] = useState(false);
  const [openClaimant, setOpenClaimant] = useState(false);
  const [openBarangay, setOpenBarangay] = useState(false);
  const [openFinancialType, setOpenFinancialType] = useState(false);

  const {
    errors,
    barangays,
    claimants,
    patients,
    financialTypes,
    controlNumber,
    appYear,
    appMonth,
  } = usePage().props;
  const { data, setData, post, processing, reset, patch } = useForm({
    control_number: controlNumber,
    app_year: appYear,
    app_month: appMonth,
    claim_date: "",
    purpose: "",
    purok: "",
    amount: "",
    patient_id: "",
    claimant_id: "",
    barangay_id: "",
    financial_type_id: "",
  });
  useEffect(() => {
    if (selectedData) {
      setData({
        control_number: selectedData.control_number || "",
        app_year: selectedData.app_year || "",
        app_month: selectedData.app_month || "",
        claim_date: selectedData.claim_date || "",
        amount: selectedData.amount || "",
        purpose: selectedData.purpose || "",
        purok: selectedData.purok || "",
        barangay_id: selectedData.barangay_id || "",
        patient_id: selectedData.patient_id || "",
        claimant_id: selectedData.claimant_id || "",
        financial_type_id: selectedData.financial_type_id || "",
      });
    } else {
      reset();
    }
  }, [selectedData, isOpen]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedData) {
      patch(route("claims.update", selectedData.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast({
            description: `${title} updated successfully`,
          });
          onClose();
        },
        onError: (errors) => console.error(errors),
      });
    } else {
      // console.info(data)
      post(route("claims.store"), {
        onSuccess: () => {
          toast({
            description: `${title} created successfully`,
          });
          onClose();
          reset();
        },
        onError: (errors) => console.error(errors),
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedData ? `Edit ${title}` : `Add ${title}`}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Note: <span className="text-red-500">*</span> is required
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {/* Control Number */}

                <div>
                  {selectedData && (
                    <>
                      <label htmlFor="control-number">Control Number</label>
                      <div className="text-red-500 font-medium">{`${appYear}-${appMonth
                        .toString()
                        .padStart(2, "0")}-${data?.control_number
                        ?.toString()
                        .padStart(4, "0")}`}</div>{" "}
                    </>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label
                    htmlFor="claim-date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="claim-date"
                    type="date"
                    name="claim_date"
                    onChange={(e) => setData("claim_date", e.target.value)}
                    value={data.claim_date}
                  />
                  <InputError message={errors.claim_date} className="mt-2" />
                </div>

                {/* Claimant */}
                <div>
                  <label
                    htmlFor="claimant"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Claimant <span className="text-red-500">*</span>
                  </label>

                  <div className="relative ">
                    <Popover open={openClaimant} onOpenChange={setOpenClaimant}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openClaimant}
                          className="w-full justify-between"
                        >
                          {data.claimant_id
                            ? claimants.data.find(
                                (claimant) => claimant.id === data.claimant_id
                              )
                              ? `${
                                  claimants.data.find(
                                    (claimant) =>
                                      claimant.id === data.claimant_id
                                  ).lastName
                                },
                                  ${
                                    claimants.data.find(
                                      (claimant) =>
                                        claimant.id === data.claimant_id
                                    ).firstName
                                  }
                                  ${
                                    claimants.data.find(
                                      (claimant) =>
                                        claimant.id === data.claimant_id
                                    ).middleName
                                      ? claimants.data.find(
                                          (claimant) =>
                                            claimant.id === data.claimant_id
                                        ).middleName + " "
                                      : ""
                                  }
                                  ${
                                    claimants.data.find(
                                      (claimant) =>
                                        claimant.id === data.claimant_id
                                    ).suffix || ""
                                  }`
                              : "Select claimant..."
                            : "Select claimant..."}
                          <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search claimant..."
                            className="h-9"
                          />
                          <CommandList className="max-h-[200px] overflow-auto">
                            <CommandEmpty>No claimant found.</CommandEmpty>
                            <CommandGroup>
                              {claimants.data.map((claimant) => (
                                <CommandItem
                                  key={claimant.id}
                                  onSelect={() => {
                                    setData("claimant_id", claimant.id);
                                    setOpenClaimant(false);
                                  }}
                                >
                                  {`${claimant.lastName}, ${
                                    claimant.firstName
                                  } ${
                                    claimant.middleName
                                      ? claimant.middleName + " "
                                      : ""
                                  }${claimant.suffix ? claimant.suffix : ""}`}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      data.claimant_id === claimant.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <InputError message={errors.claimant_id} className="mt-2" />
                </div>

                {/* Patient */}
                <div>
                  <label
                    htmlFor="patient"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Patient <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Popover open={openPatient} onOpenChange={setOpenPatient}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openPatient}
                          className="w-full justify-between"
                        >
                          {data.patient_id
                            ? patients.data.find(
                                (patient) => patient.id === data.patient_id
                              )
                              ? `${
                                  patients.data.find(
                                    (patient) => patient.id === data.patient_id
                                  )?.lastName
                                }, ${
                                  patients.data.find(
                                    (patient) => patient.id === data.patient_id
                                  )?.firstName
                                } ${
                                  patients.data.find(
                                    (patient) => patient.id === data.patient_id
                                  )?.middleName
                                    ? patients.data.find(
                                        (patient) =>
                                          patient.id === data.patient_id
                                      )?.middleName + " "
                                    : ""
                                }${
                                  patients.data.find(
                                    (patient) => patient.id === data.patient_id
                                  )?.suffix || ""
                                }`
                              : "Select patient..."
                            : "Select patient..."}
                          <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search patient..."
                            className="h-9"
                          />
                          <CommandList className="max-h-[200px] overflow-y-auto scrollbar-thin">
                            <CommandEmpty>No patient found.</CommandEmpty>
                            <CommandGroup>
                              {patients.data.map((patient) => (
                                <CommandItem
                                  key={patient.id}
                                  onSelect={() => {
                                    setData("patient_id", patient.id);
                                    setOpenPatient(false);
                                  }}
                                  className="cursor-pointer"
                                >
                                  {`${patient.lastName}, ${patient.firstName} ${
                                    patient.middleName
                                      ? patient.middleName + " "
                                      : ""
                                  }${patient.suffix ? patient.suffix : ""}`}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      data.patient_id === patient.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <InputError message={errors.patient_id} className="mt-2" />
                </div>

                {/* Purok */}
                <div>
                  <label
                    htmlFor="purok"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Purok
                  </label>
                  <Input
                    id="purok"
                    type="text"
                    name="purok"
                    placeholder="Purok"
                    onChange={(e) => setData("purok", e.target.value)}
                    value={data.purok}
                  />
                </div>

                {/* Barangay */}
                <div>
                  <label
                    htmlFor="barangay"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Barangay <span className="text-red-500">*</span>
                  </label>
                  <div className="relative ">
                    <Popover open={openBarangay} onOpenChange={setOpenBarangay}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openBarangay}
                          className="w-full justify-between"
                        >
                          {data.barangay_id
                            ? barangays.data.find(
                                (barangay) => barangay.id === data.barangay_id
                              )
                              ? `${
                                  barangays.data.find(
                                    (barangay) =>
                                      barangay.id === data.barangay_id
                                  ).barangay
                                }`
                              : "Select barangay..."
                            : "Select barangay..."}
                          <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search barangay..."
                            className="h-9"
                          />
                          <CommandList className="max-h-[200px] overflow-auto">
                            <CommandEmpty>No barangay found.</CommandEmpty>
                            <CommandGroup>
                              {barangays.data.map((barangay) => (
                                <CommandItem
                                  key={barangay.id}
                                  onSelect={() => {
                                    setData("barangay_id", barangay.id);
                                    setOpenBarangay(false);
                                  }}
                                >
                                  {`${barangay.barangay}`}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      data.barangay_id === barangay.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <InputError message={errors.barangay_id} className="mt-2" />
                </div>

                {/* Financial Assistance Type */}
                <div>
                  <label
                    htmlFor="financial_type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Financial Assistance Type{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative ">
                    <Popover
                      open={openFinancialType}
                      onOpenChange={setOpenFinancialType}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openFinancialType}
                          className="w-full justify-between"
                        >
                          {data.financial_type_id
                            ? financialTypes.data.find(
                                (financial_type) =>
                                  financial_type.id === data.financial_type_id
                              )
                              ? `${
                                  financialTypes.data.find(
                                    (financial_type) =>
                                      financial_type.id ===
                                      data.financial_type_id
                                  ).type
                                }`
                              : "Select financial_type..."
                            : "Select financial_type..."}
                          <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search financial type..."
                            className="h-9"
                          />
                          <CommandList className="max-h-[200px] overflow-auto">
                            <CommandEmpty>
                              No financial_type found.
                            </CommandEmpty>
                            <CommandGroup>
                              {financialTypes.data.map((financial_type) => (
                                <CommandItem
                                  key={financial_type.id}
                                  onSelect={() => {
                                    setData(
                                      "amount",
                                      financial_type.amount
                                    );
                                    setData(
                                      "financial_type_id",
                                      financial_type.id
                                    );
                                    setOpenFinancialType(false);
                                  }}
                                >
                                  {`${financial_type.type} (${financial_type.amount})`}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      data.financial_type_id ===
                                        financial_type.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <InputError
                    message={errors.financial_type_id}
                    className="mt-2"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="0.00"
                    className="text-right"
                    value={data.amount}
                    onChange={(e) => setData("amount", e.target.value)}
                  />

                  <InputError message={errors.amount} className="mt-2" />
                </div>

                {/* Purpose */}
                <div className="col-span-2">
                  <label
                    htmlFor="purpose"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Purpose <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    onChange={(e) => setData("purpose", e.target.value)}
                    value={data.purpose}
                    id="purpose"
                    placeholder="Purpose"
                  >
                    {data.purpose}
                  </Textarea>

                  <InputError message={errors.purpose} className="mt-2" />
                </div>
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
