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
  const hasPermission = userPermissions.includes("cash-advance-edit") || userPermissions.includes("cash-advance-delete");

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

                  {userPermissions.includes("cash-advance-edit") && (
                    <DropdownMenuItem
                      onClick={() => handleOpenModal(row.original)}
                    >
                      Edit
                      <DropdownMenuShortcut>
                        <Pencil1Icon />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )}

                  {userPermissions.includes("cash-advance-delete") && (
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
      accessorKey: "date_added",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date Added" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">{row.getValue("date_added")}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
  ];
};
