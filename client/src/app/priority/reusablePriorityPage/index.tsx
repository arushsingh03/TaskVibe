"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { useAppSelector } from "@/app/redux";
import TaskCard from "@/components/TaskCard";
import ModalNewTask from "@/components/ModalNewTask";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Priority, Task, useGetTaskByUserQuery } from "@/state/api";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { FaList, FaPlus, FaTable } from "react-icons/fa";

type Props = {
  priority: Priority;
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
    field: "startDate", // Corrected field name
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
    field: "dueDate", // Corrected field name
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

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const userId = 1;
  const {
    data: tasks,
    isLoading,
    isError: isTaskError,
  } = useGetTaskByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if (isTaskError || !tasks) return <div>Error fetching taks</div>;

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-800"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            <FaPlus /> Add Task
          </button>
        }
      />
      <div className="my-4 flex gap-4">
        <button
          className={`flex items-center gap-2 rounded-l px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white hover:bg-gray-100"
          } transition-colors`}
          onClick={() => setView("list")}
        >
          <FaList /> List
        </button>
        <button
          className={`flex items-center gap-2 rounded-r px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white hover:bg-gray-100"
          } transition-colors`}
          onClick={() => setView("table")}
        >
          <FaTable /> Table
        </button>
      </div>
      {isLoading ? (
        <div className="text-center text-xl font-semibold text-gray-500">
          Loading Task...
        </div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
