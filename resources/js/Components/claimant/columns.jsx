"use client";

import DataTableColumnHeader from "../data-table-components/data-table-column-header";
import { DeleteIcon, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import { Pencil1Icon } from "@radix-ui/react-icons";


export const getColumns = (handleOpenModal, handleShowDeleteDialog) => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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
                handleOpenModal(row.original)
              }}
            >

              Edit
              <DropdownMenuShortcut><Pencil1Icon /></DropdownMenuShortcut>

            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleShowDeleteDialog(row.original)
              }}
            >
              Delete  <DropdownMenuShortcut><DeleteIcon /></DropdownMenuShortcut>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

      ),
      enableSorting: false,
      enableHiding: false
    },

    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Name" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">{row.getValue("lastName")}</div>
      ),
      enableSorting: true,
      enableHiding: true
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Name" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">{row.getValue("firstName")}</div>
      ),
      enableSorting: true,
      enableHiding: true
    },


    {
      accessorKey: "middleName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Middle Name" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">{row.getValue("middleName")}</div>
      ),
      enableSorting: true,
      enableHiding: true
    },

    {
      accessorKey: "suffix",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Suffix" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">{row.getValue("suffix")}</div>
      ),
      enableSorting: true,
      enableHiding: true
    },
    {
      accessorKey: "birthdate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Birthdate" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">{row.getValue("birthdate")}</div>
      ),
      enableSorting: true,
      enableHiding: true
    },
    {
      accessorKey: "gender",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gender" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">{row.getValue("gender")}</div>
      ),
      enableSorting: true,
      enableHiding: true
    },
    {
      accessorKey: "maritalStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Marital Status" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">{row.getValue("maritalStatus")}</div>
      ),
      enableSorting: true,
      enableHiding: true
    },
  ];
}

