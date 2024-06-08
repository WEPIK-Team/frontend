"use client";

import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { CellAction } from "./cell-action";

import { IQuestion, QuestionType } from "@/types/question";

const typeColor = {
  INPUT: "#F693E7",
  TEXTAREA: "#8076EC",
  SELECT: "#35DFC0",
  BAR: "#ED666E",
  STAR_RANK: "#F8B76B",
  DATE: "#5FA3F3",
};

export const columns: ColumnDef<IQuestion>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell(props) {
      return <div className="pl-2">{props.getValue() as React.ReactNode}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell(props) {
      return <div className="pl-2">{props.getValue() as React.ReactNode}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell(props) {
      const value = (props.getValue() + "") as QuestionType;

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
    accessorKey: "Edit",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
