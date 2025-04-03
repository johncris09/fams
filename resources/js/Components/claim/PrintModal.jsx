"use client";


import '../../../../resources/css/stylesheet.css'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import InputError from "@/Components/InputError";
import { Check, ChevronsUpDown, PrinterIcon } from "lucide-react";
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

const PrintModal = ({ title, isOpen, onClose, selectedData }) => {
  const { toast } = useToast();
  const [openPatient, setOpenPatient] = useState(false);
  const [openClaimant, setOpenClaimant] = useState(false);
  const [openBarangay, setOpenBarangay] = useState(false);
  const [openFinancialType, setOpenFinancialType] = useState(false);

  const [isPrinting, setIsPrinting] = useState(false);
  const contentRef = useRef();
  const {
    flash,
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
    app_year: "",
    app_month: "",
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
          // if(flash.success ){
          toast({
            title: flash.success,
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
            title: flash.success,
          });
          // if (flash.error) {
          //   toast.error(flash.error);
          // }
          // if (flash.success) {
          //   toast.success(`${title} created successfully!`);
          // }
          // console.info(response)
          // //
          onClose();
          reset();
        },
        onError: (errors) => console.error(errors),
      });
    }
  };
  const handlePrint = useReactToPrint({
    contentRef,
    onBeforePrint: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve
        setIsPrinting(true)
      })
    },
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null
      setIsPrinting(false)
    },
  })

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Print</DialogTitle>

          </DialogHeader>


          <div ref={contentRef}>
            <table
              border={0}
              cellPadding={0}
              cellSpacing={0}
              width={704}
              style={{
                borderCollapse: "collapse",
                tableLayout: "fixed",
                width: "580pt",
              }}
            >
              <col width={33} style={{ width: "25pt" }} />
              <col width={31} style={{ width: "23pt" }} />
              <col width={46} style={{ width: "35pt" }} />
              <col width={64} style={{ width: "48pt" }} />
              <col width={67} style={{ width: "50pt" }} />
              <col width={28} style={{ width: "21pt" }} />
              <col width={14} style={{ width: "11pt" }} />
              <col width={31} style={{ width: "23pt" }} />
              <col width={26} style={{ width: "20pt" }} />
              <col width={51} style={{ width: "38pt" }} />
              <col width={23} style={{ width: "17pt" }} />
              <col width={21} style={{ width: "16pt" }} />
              <col width={36} style={{ width: "27pt" }} />
              <col width={42} style={{ width: "32pt" }} />
              <col width={191} style={{ width: "143pt" }} />
              <tr height={21} style={{ height: "15.75pt" }}>
                <td
                  height={21}
                  className="xl65"
                  width={33}
                  style={{ height: "15.75pt", width: "25pt" }}
                >
                  <span></span>
                </td>
                <td className="xl66" width={31} style={{ width: "23pt" }}>
                  <span></span>
                </td>
                <td className="xl66" width={46} style={{ width: "35pt" }}>
                  &nbsp;
                </td>
                <td className="xl66" width={64} style={{ width: "48pt" }}>
                  &nbsp;
                </td>
                <td
                  className="xl66"
                  colSpan={2}
                  width={95}
                  style={{ width: "71pt" }}
                >
                  <span></span>
                </td>
                <td className="xl66" width={14} style={{ width: "11pt" }}>
                  &nbsp;
                </td>
                <td className="xl66" width={31} style={{ width: "23pt" }}>
                  &nbsp;
                </td>
                <td className="xl66" width={26} style={{ width: "20pt" }}>
                  &nbsp;
                </td>
                <td className="xl66" width={51} style={{ width: "38pt" }}>
                  &nbsp;
                </td>
                <td className="xl66" width={23} style={{ width: "17pt" }}>
                  &nbsp;
                </td>
                <td className="xl66" width={21} style={{ width: "16pt" }}>
                  &nbsp;
                </td>
                <td className="xl66" width={36} style={{ width: "27pt" }}>
                  &nbsp;
                </td>
                <td
                  className="xl67"
                  colSpan={2}
                  width={233}
                  style={{ borderRight: ".5pt solid black", width: "175pt" }}
                >
                  Annex 25
                </td>
              </tr>
              <tr height={35} style={{ height: "26.25pt" }}>
                <td
                  colSpan={12}
                  height={35}
                  className="xl129"
                  style={{
                    borderRight: ".5pt solid #002060",
                    height: "26.25pt",
                  }}
                >
                  FINANCIAL ASSISTANCE VOUCHER
                </td>
                <td className="xl69">No.:</td>
                <td className="xl66" style={{ fontSize: 18 }}>
                  <b>
                   asdf
                  </b>
                </td>
                <td className="xl70">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.75pt" }}>
                <td
                  colSpan={12}
                  style={{
                    borderRight: "0.5pt solid #002060",
                    height: "15.75pt",
                  }}
                  className="xl132"
                >
                  City Government of Oroquieta&nbsp;
                </td>
                <td className="xl71">Date:</td>
                <td
                  className="xl72 text-black"
                  style={{ fontWeight: "bolder" }}
                >
                  asdf
                </td>
                <td className="xl73">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td
                  colSpan={12}
                  style={{
                    borderRight: "0.5pt solid #002060",
                    height: "15.0pt",
                  }}
                  className="xl135"
                >
                  LGU
                </td>
                <td className="xl74" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl75">&nbsp;</td>
                <td className="xl76">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl70" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td
                  colSpan={3}
                  className="xl71"
                  style={{
                    borderRight: "0.5pt solid #002060",
                  }}
                >
                  Responsibility Center
                </td>
              </tr>
              <tr style={{ height: "19.5pt" }}>
                <td colSpan={3} style={{ height: "19.5pt" }} className="xl80">
                  Payee/Office
                </td>
                <td colSpan={7} className="xl138 text-black">
                 aasdf
                </td>
                <td className="xl82"></td>
                <td className="xl83">
                  <span style={{ whiteSpace: "pre" }}></span>
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl80">
                  Sex:
                </td>
                <td className="xl139 text-black" style={{ fontSize: 18 }}>
                  <b>asdf</b>
                </td>
                <td className="xl78"></td>
                <td className="xl80" style={{ border: "0" }} colSpan={3}>
                  Marital Status:{" "}
                  <span className="xl139 text-black" style={{ fontSize: 18 }}>
                    <b>adf</b>
                  </span>
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl80" style={{ border: "0" }}>
                  Age:
                  <span
                    className="xl139 text-black"
                    style={{ marginLeft: 3, fontSize: 18 }}
                  >
                    <b>asdf</b>
                  </span>
                </td>

                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl78"></td>
                <td className="xl84">1011</td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.75pt" }}>
                <td
                  style={{ height: "15.75pt", msoIgnore: "colspan" }}
                  colSpan={3}
                  className="xl80"
                >
                  Address:
                </td>
                <td
                  colSpan={8}
                  className="xl139 text-black"
                  style={{ fontWeight: "bolder" }}
                >
                  <b>
                   asdf, Oroquieta City
                  </b>
                </td>
                <td className="xl83">&nbsp;</td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl74">
                  &nbsp;
                </td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl76">&nbsp;</td>
                <td style={{ borderLeft: "none" }} className="xl74">
                  &nbsp;
                </td>
                <td className="xl75">&nbsp;</td>
                <td className="xl76">&nbsp;</td>
              </tr>
              <tr style={{ height: "16.5pt" }}>
                <td
                  style={{ height: "16.5pt", borderTop: "none" }}
                  className="xl85"
                >
                  I
                </td>
                <td
                  colSpan={4}
                  style={{ msoIgnore: "colspan" }}
                  className="xl86"
                >
                  <span style={{ whiteSpace: "pre" }}> </span>To be filled up
                  upon request
                </td>
                <td style={{ borderTop: "none" }} className="xl86">
                  &nbsp;
                </td>
                <td style={{ borderTop: "none" }} className="xl86">
                  &nbsp;
                </td>
                <td style={{ borderTop: "none" }} className="xl87">
                  &nbsp;
                </td>
                <td style={{ borderTop: "none" }} className="xl86">
                  &nbsp;
                </td>
                <td style={{ borderTop: "none" }} className="xl88">
                  &nbsp;
                </td>
                <td style={{ borderTop: "none" }} className="xl89">
                  II
                </td>
                <td
                  colSpan={4}
                  style={{
                    msoIgnore: "colspan",
                    borderRight: ".5pt solid #002060",
                  }}
                  className="xl86"
                >
                  <span style={{ whiteSpace: "pre" }}> </span>To be filled up
                  upon liquidation
                  <span style={{ whiteSpace: "pre" }}> </span>
                </td>
              </tr>
              <tr style={{ height: "17.25pt" }}>
                <td colSpan={7} style={{ height: "17.25pt" }} className="xl140">
                  PARTICULARS
                </td>
                <td colSpan={3} className="xl140">
                  AMOUNT
                </td>
                <td
                  style={{ borderTop: "none", borderLeft: "none" }}
                  className="xl65"
                >
                  &nbsp;
                </td>
                <td style={{ borderTop: "none" }} className="xl66">
                  &nbsp;
                </td>
                <td style={{ borderTop: "none" }} className="xl66">
                  &nbsp;
                </td>
                <td style={{ borderTop: "none" }} className="xl66">
                  &nbsp;
                </td>
                <td style={{ borderTop: "none" }} className="xl70">
                  &nbsp;
                </td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td
                  colSpan={7}
                  rowSpan={8}
                  style={{
                    borderRight: ".5pt solid black",
                    height: "121.5pt",
                    width: "213pt",
                  }}
                  className="xl151 "
                >
                  <span style={{ whiteSpace: "pre" }}> </span>To payment of
                  financial assistance to the above-named claimant for
                  <span
                    className="text-black"
                    style={{ fontWeight: "bolder", fontSize: 15 }}
                  >
                    {" "}
                    <u>
                      <i>asdfasdf</i>
                    </u>
                  </span>
                  , per supporting papers hereto attached or in the amount of .
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td style={{ borderLeft: "none" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl94"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td
                  colSpan={4}
                  style={{ borderLeft: "none" }}
                  className="xl148"
                >
                  Total Amount Granted:
                </td>
                <td className="xl150">
                  <u style={{ visibility: "hidden", msoIgnore: "visibility" }}>
                    &nbsp;
                  </u>
                </td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl91"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl93" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl91"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl93" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl94"></td>
                <td className="xl95"></td>
                <td className="xl96">
                  <u style={{ visibility: "hidden", msoIgnore: "visibility" }}>
                    &nbsp;
                  </u>
                </td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.75pt" }}>
                <td style={{ height: "15.75pt" }} className="xl71">
                  Php
                </td>
                <td
                  colSpan={2}
                  className="xl142 text-black"
                  style={{
                    fontWeight: "bolder",
                    borderRight: ".5pt solid #002060",
                  }}
                >
                  <span style={{ msoSpacerun: "yes" }}></span>
                  <b> asdf</b>
                </td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>

              <tr style={{ height: "15.75pt" }}>
                <td
                  style={{ height: "15.75pt" }}
                  colSpan={2}
                  className="mso-ignore-colspan"
                ></td>
                <td className="xl97" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td
                  colSpan={5}
                  className="xl71"
                  style={{
                    msoIgnoreColspan: "true",
                    borderRight: ".5pt solid #002060",
                  }}
                >
                  Total Amount Paid per
                </td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td
                  style={{ height: "15.0pt" }}
                  colSpan={3}
                  className="mso-ignore-colspan"
                ></td>
                <td className="xl93">&nbsp;</td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} colSpan={5} className="xl98">
                  SUPPORTING PAPERS ATTACHED:
                </td>
                <td className="xl99"></td>
                <td className="xl100">&nbsp;</td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.75pt" }}>
                <td style={{ height: "15.75pt" }} colSpan={4} className="xl90">
                  <span style={{ msoSpacerun: "yes" }}></span>1. Case Study
                  Report
                </td>
                <td className="xl91"></td>
                <td className="xl91"></td>
                <td className="xl92">&nbsp;</td>
                <td className="xl101" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ msoHeightSource: "userset", height: "15.75pt" }}>
                <td colSpan={8} style={{ height: "15.75pt" }} className="xl144">
                  <span style={{ msoSpacerun: "yes" }}></span>2. Medicine
                  Prescriptions/Statement of Account/
                </td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ msoHeightSource: "userset", height: "15.75pt" }}>
                <td style={{ height: "15.75pt" }} className="xl90">
                  &nbsp;
                </td>
                <td colSpan={7} className="xl145">
                  Death Certificate/Senior Citizen&apos;s I. D./Brgy.
                </td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td
                  colSpan={5}
                  style={{ borderRight: ".5pt solid #002060" }}
                  className="xl93"
                >
                  Amount Refunded/
                </td>
              </tr>

              <tr style={{ height: "16.5pt" }}>
                <td style={{ height: "16.5pt" }} className="xl90">
                  &nbsp;
                </td>
                <td
                  colSpan={2}
                  className="xl91"
                  style={{ msoIgnoreColspan: true }}
                >
                  Certification
                </td>
                <td className="xl91"></td>
                <td className="xl91"></td>
                <td className="xl91"></td>
                <td className="xl92">&nbsp;</td>
                <td className="xl101" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td
                  colSpan={3}
                  className="xl93"
                  style={{ msoIgnoreColspan: true }}
                >
                  (Reimburse<span style={{ display: "none" }}>d</span>)
                </td>
                <td className="xl102">&nbsp;</td>
                <td className="xl103">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.75pt" }}>
                <td style={{ height: "15.75pt" }} className="xl74">
                  &nbsp;
                </td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl76">&nbsp;</td>
                <td className="xl74" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl75">&nbsp;</td>
                <td className="xl76">&nbsp;</td>
                <td className="xl74" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl76">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td
                  style={{ height: "15.0pt", borderTop: "none" }}
                  className="xl104"
                >
                  A.
                </td>
                <td
                  className="xl94"
                  colSpan={3}
                  style={{ msoIgnore: "colspan" }}
                >
                  Requested by:
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl70" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td
                  className="xl104"
                  style={{ borderTop: "none", borderLeft: "none" }}
                >
                  C.
                </td>
                <td className="xl66" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td className="xl66" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td className="xl66" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td className="xl70" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td></td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.75pt" }}>
                <td style={{ height: "15.75pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78">
                  <span style={{ msoSpacerun: "yes" }}></span>
                </td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78">
                  <div className="square"></div>
                </td>
                <td
                  className="xl94"
                  colSpan={3}
                  style={{ borderRight: ".5pt solid #002060" }}
                >
                  Received Refund
                </td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td colSpan={5} className="xl118">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.75pt" }}>
                <td style={{ height: "15.75pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td
                  colSpan={5}
                  className="xl128 text-black"
                  style={{ fontWeight: "bolder" }}
                >
                  <b>
                   asdf
                  </b>
                </td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78">
                  <div className="square"></div>
                </td>
                <td
                  className="xl94"
                  colSpan={3}
                  style={{ borderRight: ".5pt solid #002060" }}
                >
                  Reimbursement Paid
                </td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td
                  className="xl94"
                  colSpan={3}
                  style={{ msoIgnore: "colspan" }}
                >
                  Approved by:
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl71"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.75pt" }}>
                <td style={{ height: "15.75pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl106"></td>
                <td className="xl106"></td>
                <td
                  colSpan={5}
                  className="xl118  text-black"
                  style={{ fontWeight: "bolder" }}
                >
                  <b> WELITA C. LARA</b>
                </td>
                <td className="xl106"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl77" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td
                  colSpan={4}
                  className="xl118 text-black"
                  style={{
                    fontWeight: "bolder",
                    borderRight: ".5pt solid #002060",
                  }}
                >
                  <b>HAIDE GALIMBAS</b>
                </td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl107"></td>
                <td colSpan={7} className="xl120">
                  Executive Assistant IV
                </td>
                <td className="xl108">&nbsp;</td>
                <td className="xl109" style={{ borderLeft: "none" }}>
                  &nbsp;
                </td>
                <td
                  colSpan={4}
                  className="xl121"
                  style={{ borderRight: ".5pt solid #002060" }}
                >
                  Disbursing Officer
                </td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl110">
                  &nbsp;
                </td>
                <td className="xl111">&nbsp;</td>
                <td className="xl111" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td className="xl111" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td className="xl111" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td className="xl111" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td className="xl111" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td className="xl111" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td className="xl111" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td className="xl73" style={{ borderTop: "none" }}>
                  &nbsp;
                </td>
                <td className="xl112">&nbsp;</td>
                <td className="xl113">&nbsp;</td>
                <td className="xl113">&nbsp;</td>
                <td className="xl113">&nbsp;</td>
                <td className="xl114">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl104">
                  B.
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl115" style={{ borderTop: "none" }}>
                  D.
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>

              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td
                  className="xl94"
                  colSpan={2}
                  style={{ msoIgnore: "colspan" }}
                >
                  Paid by:
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl78"></td>
                <td className="xl78">
                  <div className="square"></div>
                </td>
                <td
                  className="xl94"
                  colSpan={3}
                  style={{ borderRight: ".5pt solid #002060" }}
                >
                  Liquidation Submitted
                </td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td
                  colSpan={5}
                  className="xl118 text-black"
                  style={{ fontWeight: "bolder" }}
                >
                  <b>HAIDE GALIMBAS</b>
                </td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td colSpan={5} className="xl121">
                  Disbursing Officer
                </td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl78"></td>
                <td></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl78"></td>
                <td className="xl78">
                  <div className="square"></div>
                </td>
                <td
                  className="xl94"
                  colSpan={3}
                  style={{ borderRight: ".5pt solid #002060" }}
                >
                  Reimbursement Received by
                </td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td
                  className="xl94"
                  colSpan={3}
                  style={{ msoIgnore: "colspan" }}
                >
                  Cash Received by:
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "18.75pt" }}>
                <td style={{ height: "18.75pt" }} className="xl77">
                  &nbsp;
                </td>
                <td colSpan={8} className="xl123 text-black">
                  asdf
                </td>
                <td className="xl83">&nbsp;</td>
                <td
                  colSpan={5}
                  className="xl124 text-black"
                  style={{
                    borderRight: ".5pt solid black",
                    borderLeft: "none",
                  }}
                >
                 asdf
                </td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl84"></td>
                <td colSpan={6} className="xl84">
                  Signature over Printed Name Of Payee
                </td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td
                  colSpan={5}
                  className="xl84"
                  style={{ borderRight: ".5pt solid #002060" }}
                >
                  Signature of Payee
                </td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl77">
                  &nbsp;
                </td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl78"></td>
                <td className="xl83">&nbsp;</td>
              </tr>
              <tr style={{ height: "15.0pt" }}>
                <td style={{ height: "15.0pt" }} className="xl74">
                  &nbsp;
                </td>
                <td
                  className="xl75"
                  colSpan={2}
                  style={{ msoIgnore: "colspan" }}
                >
                  Date:
                </td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td className="xl76">&nbsp;</td>
                <td className="xl75">&nbsp;</td>
                <td
                  className="xl75"
                  colSpan={2}
                  style={{ msoIgnore: "colspan" }}
                >
                  Date:
                </td>
                <td className="xl75">&nbsp;</td>
                <td className="xl76">&nbsp;</td>
              </tr>
              <tr style={{ display: "none" }}>
                <td style={{ width: "25pt" }}></td>
                <td style={{ width: "23pt" }}></td>
                <td style={{ width: "35pt" }}></td>
                <td style={{ width: "48pt" }}></td>
                <td style={{ width: "50pt" }}></td>
                <td style={{ width: "21pt" }}></td>
                <td style={{ width: "11pt" }}></td>
                <td style={{ width: "23pt" }}></td>
                <td style={{ width: "20pt" }}></td>
                <td style={{ width: "38pt" }}></td>
                <td style={{ width: "17pt" }}></td>
                <td style={{ width: "16pt" }}></td>
                <td style={{ width: "27pt" }}></td>
                <td style={{ width: "32pt" }}></td>
                <td style={{ width: "143pt" }}></td>
              </tr>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrintModal;
