"use client";

import DataTableColumnHeader from "../data-table-components/data-table-column-header";
import { DeleteIcon, MoreHorizontal } from "lucide-react";
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

export const getColumns = (auth, handleOpenModal, handleShowDeleteDialog) => {
  const userPermissions = auth.user?.permissions || [];
  const hasPermission = userPermissions.includes("patient-edit") || userPermissions.includes("patient-delete");

  return [
    ...(hasPermission
      ? [
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

                  {userPermissions.includes("patient-edit") && (
                    <DropdownMenuItem
                      onClick={() => handleOpenModal(row.original)}
                    >
                      Edit
                      <DropdownMenuShortcut>
                        <Pencil1Icon />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )}

                  {userPermissions.includes("patient-delete") && (
                    <DropdownMenuItem
                      onClick={() => handleShowDeleteDialog(row.original)}
                    >
                      Delete
                      <DropdownMenuShortcut>
                        <DeleteIcon />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ),
          },
        ]
      : []),

    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Name" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">{row.getValue("lastName")}</div>
      ),
      enableSorting: true,
      enableHiding: true,
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
      enableHiding: true,
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
      enableHiding: true,
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
      enableHiding: true,
    },
  ];
};
