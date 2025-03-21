
// import {
//   createColumnHelper,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// // import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

// // import { Button } from "@/Components/ui/button"
// // import { Checkbox } from "@/Components/ui/checkbox"
// // import {
// //   DropdownMenu,
// //   DropdownMenuCheckboxItem,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuLabel,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from "@/Components/ui/dropdown-menu"
// // import { Input } from "@/Components/ui/input"
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/Components/ui/table"
// // import { usePage } from "@inertiajs/react"


export function DataTableDemo() {

  // const { users, filters } = usePage().props; // Get data from Inertia
  // const userData = users.data || [];

  // const [sorting, setSorting] = useState([])
  // const [columnFilters, setColumnFilters] = useState([])
  // const [columnVisibility, setColumnVisibility] = useState({})
  // const [rowSelection, setRowSelection] = useState({})
  // const columns = useMemo(
  //   () => [
  //     { accessorKey: "id", header: "ID" },
  //     { accessorKey: "name", header: "Name" },
  //     { accessorKey: "email", header: "Email" },
  //   ],
  //   []
  // );
  // const table = useReactTable({
  //   userData,
  //   columns,
  //   onSortingChange: setSorting,
  //   onColumnFiltersChange: setColumnFilters,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   onColumnVisibilityChange: setColumnVisibility,
  //   onRowSelectionChange: setRowSelection,
  //   state: {
  //     sorting,
  //     columnFilters,
  //     columnVisibility,
  //     rowSelection,
  //   },
  // })

  // return (
  //   <div className="w-full">
  //     <div className="flex items-center py-4">
  //       <Input
  //         placeholder="Filter emails..."
  //         value={(table.getColumn("email")?.getFilterValue()) ?? ""}
  //         onChange={(event) =>
  //           table.getColumn("email")?.setFilterValue(event.target.value)
  //         }
  //         className="max-w-sm"
  //       />
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="outline" className="ml-auto">
  //             Columns <ChevronDown />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           {table
  //             .getAllColumns()
  //             .filter((column) => column.getCanHide())
  //             .map((column) => {
  //               return (
  //                 <DropdownMenuCheckboxItem
  //                   key={column.id}
  //                   className="capitalize"
  //                   checked={column.getIsVisible()}
  //                   onCheckedChange={(value) =>
  //                     column.toggleVisibility(!!value)
  //                   }
  //                 >
  //                   {column.id}
  //                 </DropdownMenuCheckboxItem>
  //               )
  //             })}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     </div>
  //     <div className="rounded-md border">
  //       <Table>
  //         <TableHeader>
  //           {table.getHeaderGroups().map((headerGroup) => (
  //             <TableRow key={headerGroup.id}>
  //               {headerGroup.headers.map((header) => {
  //                 return (
  //                   <TableHead key={header.id}>
  //                     {header.isPlaceholder
  //                       ? null
  //                       : flexRender(
  //                         header.column.columnDef.header,
  //                         header.getContext()
  //                       )}
  //                   </TableHead>
  //                 )
  //               })}
  //             </TableRow>
  //           ))}
  //         </TableHeader>
  //         <TableBody>
  //           {table.getRowModel().rows?.length ? (
  //             table.getRowModel().rows.map((row) => (
  //               <TableRow
  //                 key={row.id}
  //                 data-state={row.getIsSelected() && "selected"}
  //               >
  //                 {row.getVisibleCells().map((cell) => (
  //                   <TableCell key={cell.id}>
  //                     {flexRender(
  //                       cell.column.columnDef.cell,
  //                       cell.getContext()
  //                     )}
  //                   </TableCell>
  //                 ))}
  //               </TableRow>
  //             ))
  //           ) : (
  //             <TableRow>
  //               <TableCell
  //                 colSpan={columns.length}
  //                 className="h-24 text-center"
  //               >
  //                 No results.
  //               </TableCell>
  //             </TableRow>
  //           )}
  //         </TableBody>
  //       </Table>
  //     </div>
  //     <div className="flex items-center justify-end space-x-2 py-4">
  //       <div className="flex-1 text-sm text-muted-foreground">
  //         {table.getFilteredSelectedRowModel().rows.length} of{" "}
  //         {table.getFilteredRowModel().rows.length} row(s) selected.
  //       </div>
  //       <div className="space-x-2">
  //         <Button
  //           variant="outline"
  //           size="sm"
  //           onClick={() => table.previousPage()}
  //           disabled={!table.getCanPreviousPage()}
  //         >
  //           Previous
  //         </Button>
  //         <Button
  //           variant="outline"
  //           size="sm"
  //           onClick={() => table.nextPage()}
  //           disabled={!table.getCanNextPage()}
  //         >
  //           Next
  //         </Button>
  //       </div>
  //     </div>
  //   </div>
  // )
}
