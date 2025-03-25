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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">{row.getValue("name")}</div>
      ),
      enableSorting: true,
      enableHiding: true
    },
    {
      accessorKey: "guard_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Guard Name" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">{row.getValue("guard_name")}</div>
      ),
      enableSorting: true,
      enableHiding: true
    },

  ];
}

