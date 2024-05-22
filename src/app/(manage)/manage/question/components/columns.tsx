"use client";

import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { CellAction } from "./cell-action";

type QuestionType = "select" | "shortText" | "progress" | "textArea";

export interface IQuestion {
  id: string;
  title: string;
  type: QuestionType;
  createAt: string;
}

const typeColor = {
  select: "bg-emerald-500",
  shortText: "bg-blue-500",
  progress: "bg-orange-500",
  textArea: "bg-violet-500",
};

export const columns: ColumnDef<IQuestion>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell(props) {
      const value = (props.getValue() + "") as QuestionType;

      return (
        <div
          className={cn(
            "text-wpt-xs w-fit rounded-md p-1 font-semibold text-white",
            typeColor[value]
          )}
        >
          {props.getValue() as React.ReactNode}
        </div>
      );
    },
  },
  {
    accessorKey: "createAt",
    header: "CreateAt",
  },
  {
    accessorKey: "Edit",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
