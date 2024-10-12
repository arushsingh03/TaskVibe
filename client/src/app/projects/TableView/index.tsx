import React from "react";
import Header from "@/components/Header";
import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => {
      const getStatusStyles = (status: any) => {
        switch (status) {
          case "To Do":
            return {
              bgColor: "bg-red-100",
              textColor: "text-red-500",
            };
          case "Under Review":
            return {
              bgColor: "bg-yellow-100",
              textColor: "text-yellow-500",
            };
          case "Completed":
            return {
              bgColor: "bg-green-100",
              textColor: "text-green-500",
            };
          case "Work In Progress":
            return {
              bgColor: "bg-sky-100",
              textColor: "text-sky-500",
            };
          default:
            return {
              bgColor: "bg-gray-100",
              textColor: "text-gray-500",
            };
        }
      };

      const { bgColor, textColor } = getStatusStyles(params.value);

      return (
        <span
          className={`inline-flex rounded-full ${bgColor} px-2 text-xs font-semibold leading-5 ${textColor}`}
        >
          {params.value}
        </span>
      );
    },
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startdate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "duedate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned",
  },
];

const Table = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occur while fetching tasks</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="Table" isSmallText />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
};

export default Table;
