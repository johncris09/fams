"use client";

import DataTableColumnHeader from "../data-table-components/data-table-column-header";
import {
  DeleteIcon,
  EditIcon,
  LucidePrinter,
  MoreHorizontal,
  Printer,
  PrinterCheck,
  PrinterIcon,
} from "lucide-react";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Pencil1Icon } from "@radix-ui/react-icons";

export const getColumns = (handleOpenModal, handleShowDeleteDialog) => {
  return [
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                // handleOpenModal(row.original);
              }}
            >
              Print
              <DropdownMenuShortcut>
                <Printer />
              </DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                handleOpenModal(row.original);
              }}
            >
              Edit
              <DropdownMenuShortcut>
                <EditIcon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleShowDeleteDialog(row.original);
              }}
            >
              Delete{" "}
              <DropdownMenuShortcut>
                <DeleteIcon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "control_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Control Number" />
      ),
      cell: ({ row }) => {
        const control_number = row.original.control_number || "0000";
        const app_month = row.original.app_month || "01";
        const app_year = row.original.app_year || "0000";

        return (
          <div className="w-[200px] capitalize">
            {`${app_year}-${app_month.toString().padStart(2, "0")}-${control_number.toString().padStart(4, "0")}`}
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "claimant_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Claimant" />
      ),
      cell: ({ row }) => {
        const { last_name, first_name, middle_name, suffix } =
          row.original.claimant;

        return (
          <div className="w-[200px] capitalize">
            {`${last_name}, ${first_name} ${middle_name || ""} ${
              suffix || ""
            }`.trim()}
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },

    {
      accessorKey: "claimant_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Claimant's Gender" />
      ),
      cell: ({ row }) => {
        return (
          <div className=" capitalize">{row.original.claimant.gender}</div>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "patient_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Patient" />
      ),
      cell: ({ row }) => {
        const { last_name, first_name, middle_name, suffix } =
          row.original.patient;

        return (
          <div className="w-[200px] capitalize">
            {`${last_name}, ${first_name} ${middle_name || ""} ${
              suffix || ""
            }`.trim()}
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "financial_type_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Financial Type" />
      ),

      cell: ({ row }) => (
        <div className=" capitalize">{row.original.financial_type.type}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "purok",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Purok" />
      ),

      cell: ({ row }) => (
        <div className=" capitalize">{row.original.purok}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "barangay_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Barangay" />
      ),

      cell: ({ row }) => (
        <div className=" capitalize w-[200px]">{row.original.barangay.barangay}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => {
        const amount = row.getValue("amount");
        const formattedAmount = new Intl.NumberFormat("en-US", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount);

        return (
          <div className="flex w-[100px] items-center">
            <span className="capitalize">{formattedAmount}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "claim_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Claim Date" />
      ),
      cell: ({ row }) => (
        <div className=" capitalize">{row.getValue("claim_date")}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },

    {
      accessorKey: "purpose",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Purpose" />
      ),

      cell: ({ row }) => (
        <div className=" capitalize w-[500px]">{row.original.purpose}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
  ];
};
