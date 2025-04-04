"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  const hasPermission =
    userPermissions.includes("user-edit") ||
    userPermissions.includes("user-delete");

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

                  {userPermissions.includes("user-edit") && (
                    <DropdownMenuItem
                      onClick={() => handleOpenModal(row.original)}
                    >
                      Edit
                      <DropdownMenuShortcut>
                        <Pencil1Icon />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )}

                  {userPermissions.includes("user-delete") && (
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
      accessorKey: "avatar",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Avatar" />
      ),
      cell: ({ row }) => (
        <div className="w-[90px] capitalize">
          <Avatar>
            <AvatarImage src={row.getValue("avatar")} />
            <AvatarFallback>FAMS</AvatarFallback>
          </Avatar>
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="w-[200px] capitalize">{row.getValue("name")}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },

    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => (
        <div className="w-[200px] capitalize whitespace-normal break-words">{row.getValue("email")}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },

    {
      accessorKey: "roles",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Roles" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize">{row.getValue("roles")}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
  ];
};
