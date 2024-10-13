import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetTasksQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { FaPlus } from "react-icons/fa";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
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
    field: "startDate",
    headerName: "Start Date",
    width: 130,
    renderCell: (params) =>
      params.value ? (
        <span>{new Date(params.value).toLocaleDateString()}</span>
      ) : (
        <span className="text-gray-500">No date</span>
      ),
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
    renderCell: (params) =>
      params.value ? (
        <span>{new Date(params.value).toLocaleDateString()}</span>
      ) : (
        <span className="text-gray-500">No due date</span>
      ),
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value?.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.username || "Unassigned",
  },
];

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <FaPlus className="mr-2" /> Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="data-grid-container h-[540px] w-full px-4 pb-8 xl:px-6">
        <DataGrid
          rows={tasks || []}
          columns={columns}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default TableView;
