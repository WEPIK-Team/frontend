"use client";

import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { QuestionTypeTest } from "@/lib/data/question";

import { CellAction } from "./cell-action";

export interface IQuestion {
  id: string;
  title: string;
  type: QuestionTypeTest;
  createAt: string;
}

const typeColor = {
  input: "#F693E7",
  textarea: "#8076EC",
  select: "#35DFC0",
  bar: "#ED666E",
  stars: "#F8B76B",
  date: "#5FA3F3",
};

export const columns: ColumnDef<IQuestion>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell(props) {
      const value = (props.getValue() + "") as QuestionTypeTest;

      return (
        <div
          style={{
            backgroundColor: typeColor[value],
          }}
          className={cn(
            "text-wpt-xs w-fit rounded-full px-[13px] pb-[9px] pt-[7px] font-semibold text-white"
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
