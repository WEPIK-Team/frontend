"use client";

import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { QuestionSelectOptions } from "@/lib/data/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [isGrad, setIsGrad] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-end py-4">
        <div className="flex items-center gap-x-[20px]">
          <div className="relative flex ">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <MagnifyingGlassIcon className="h-5 w-5" color="#8F8F95" />
            </div>
            <input
              placeholder="타이틀 기준으로 검색"
              value={table.getColumn("title")?.getFilterValue() as string}
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="h-[30px] w-full max-w-[228px] rounded-[18px] border border-wpc-gray2 bg-wpc-light-gray px-[34px] py-[17px] text-wpt-base-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-wpc-gray focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="w-[136px]">
            <Select
              onOpenChange={(isOpen) => {
                setIsGrad(isOpen);
              }}
              onValueChange={(value) => {
                if (value === "All") {
                  table.getColumn("type")?.setFilterValue("");
                } else {
                  table.getColumn("type")?.setFilterValue(value);
                }
              }}
            >
              <SelectTrigger
                className={cn(
                  "w-full rounded-full p-[1px]",
                  isGrad ? "div-border-gradient " : ""
                )}
              >
                <div className="flex w-full items-center justify-between px-[15px] py-[13px]">
                  <SelectValue placeholder="타입 선택" />
                  <ChevronDownIcon
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isGrad ? "rotate-180" : ""
                    )}
                  />
                </div>
              </SelectTrigger>
              <SelectContent className="flex items-center justify-center gap-y-6 rounded-[16px] px-[5px] py-[6px]">
                {QuestionSelectOptions.map((el) => (
                  <SelectItem
                    value={el.value}
                    key={new Date() + el.value}
                    className="w-full  text-wpc-gray "
                  >
                    <div className="flex w-full items-center gap-x-2 ">
                      {el.icon} {el.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="">
        <Table>
          <TableHeader className="[&_tr]:border-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-[#F8F7FD] px-4 py-2 first:rounded-l-[8px] last:rounded-r-[8px]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end  gap-x-2 py-4">
        <button
          className="h-fit rounded-[16px] bg-wpc-light-gray px-[30px] py-[13px] text-wpc-gray disabled:cursor-not-allowed disabled:opacity-70"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          이전
        </button>
        <button
          className="h-fit rounded-[16px] bg-wpc-primary px-[30px] py-[13px] text-white disabled:cursor-not-allowed disabled:opacity-20"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          다음
        </button>
      </div>
    </div>
  );
}
