import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

export function DataTablePagination({ table, meta, filters }) {
  const {per_page} = filters;
  const currentPage = meta.current_page - 1; // Adjust for zero-based index
  const totalPages = meta.last_page;
  // const visiblePages = 3; // Adjust how many pages to show before '...'

  const generatePagination = (links) => {
    const totalPages = links.length - 2; // Excluding prev/next
    const visiblePages = 3; // Number of pages before and after current

    return links.reduce((acc, link, index) => {
      if (index === 0 || index === links.length - 1) {
        // Always include "Previous" & "Next"
        acc.push(link);
      } else if (
        link.active || // Always show the active page
        link.label == "1" || // Always show first page
        link.label == totalPages.toString() || // Always show last page
        Math.abs(Number(link.label) - links.find((l) => l.active)?.label) <=
          visiblePages // Show nearby pages
      ) {
        acc.push(link);
      } else if (acc[acc.length - 1]?.label !== "...") {
        acc.push({ url: null, label: "...", active: false }); // Add "..." only once
      }
      return acc;
    }, []);
  };
  const paginationLinks = generatePagination(meta.links);
  const pageSizeOptions = [5, 10, 20, 30, 40, 50];

  useEffect(() => {
    // Sync table page size with backend when component mounts
    table.setPageSize(meta.per_page);
  }, [meta.per_page]);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8 justify-between  w-full">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${meta.per_page}`}
            onValueChange={(value) => {
              router.visit(meta.path + `?page=1&per_page=${value}`);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={meta.per_page} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          {/* Page Info */}
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage + 1} of {totalPages}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-1">
            {/* First Page */}
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => router.visit(`${meta.path}?page=1&&per_page=${per_page}`)}
              disabled={currentPage === 0}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            {paginationLinks.map((link, index) => {
              if (link.label === "...") {
                return (
                  <span key={index} className="px-2 text-gray-500">
                    ...
                  </span>
                );
              }

              // Decode "&laquo; Previous" and "Next &raquo;"
              const isPrev = link.label.includes("Previous");
              const isNext = link.label.includes("Next");

              return (
                <Button
                  key={index}
                  variant={link.active ? "default" : "outline"}
                  className="h-8 w-8 p-0"
                  onClick={() => link.url && router.visit(`${link.url}&&per_page=${per_page}`)}
                >
                  {isPrev ? (
                    <ChevronLeftIcon className="h-4 w-4" />
                  ) : isNext ? (
                    <ChevronRightIcon className="h-4 w-4" />
                  ) : (
                    link.label
                  )}
                </Button>
              );
            })}

            {/* Last Page */}
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => router.visit(`${meta.path}?page=${totalPages}&&per_page=${per_page}`)}
              disabled={currentPage + 1 === totalPages}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
