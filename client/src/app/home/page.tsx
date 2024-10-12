"use client";

import React from "react";
import Header from "@/components/Header";
import { useAppSelector } from "../redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Priority,
  Project,
  Task,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/state/api";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { Assignment, DoneAll, Pending } from "@mui/icons-material";

const taskColumns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "priority", headerName: "Priority", width: 150 },
  { field: "dueDate", headerName: "Due Date", width: 150 },
];

const COLORS = ["#6A1B9A", "#FF4081", "#29B6F6", "#66BB6A"];

const HomePage = () => {
  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("1") });
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (tasksLoading || isProjectsLoading) return <div>Loading...</div>;
  if (tasksError || !tasks || !projects) return <div>Error fetching data</div>;

  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {}
  );

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  const statusCount = projects.reduce(
    (acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Completed" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  const chartColors = isDarkMode
    ? {
        bar: "#FF7043",
        barGrid: "#424242",
        pieFill: "#7E57C2",
        text: "#FFFFFF",
      }
    : {
        bar: "#42A5F5",
        barGrid: "#E0E0E0",
        pieFill: "#4CAF50",
        text: "#000000",
      };

  return (
    <div className="container h-full w-full bg-gray-50 p-8 dark:bg-gray-900">
      <Header name="Project Management Dashboard" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Task Priority Distribution */}
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold dark:text-white">
            <Assignment /> Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution} barSize={50}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.barGrid} />
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill={chartColors.bar}
                animationDuration={800}
              >
                {taskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status */}
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold dark:text-white">
            <DoneAll /> Project Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectStatus}
                dataKey="count"
                fill={chartColors.pieFill}
                label
                animationDuration={800}
              >
                {projectStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Your Tasks */}
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 md:col-span-2">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold dark:text-white">
            <Pending /> Your Tasks
          </h3>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={taskColumns}
              checkboxSelection
              loading={tasksLoading}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
