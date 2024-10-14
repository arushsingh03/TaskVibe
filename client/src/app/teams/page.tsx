"use client";

import React from "react";
import Header from "@/components/Header";
import { useAppSelector } from "../redux";
import { useGetTeamsQuery } from "@/state/api";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const CustomToolbar = () => (
  <GridToolbarContainer
    className="toolbar flex gap-2">
    <GridToolbarFilterButton/>
    <GridToolbarExport/>
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading)
    return <div className="mt-20 text-center text-xl">Loading...</div>;
  if (isError || !teams)
    return (
      <div className="mt-20 text-center text-red-500">Error fetching teams</div>
    );

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        isDarkMode ? "from-gray-900 to-cyan-900" : "from-gray-300 to-gray-800"
      } p-8`}
    >
      <Header name="Teams" />
      <div
        className={`mt-10 rounded-lg p-6 shadow-lg ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-800 to-cyan-800"
            : "bg-gradient-to-br from-white to-gray-300"
        }`}
      >
        <div style={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={teams || []}
            columns={columns}
            pagination
            slots={{
              toolbar: CustomToolbar,
            }}
            className={dataGridClassNames}
            sx={{
              ...dataGridSxStyles(isDarkMode),
              "& .MuiDataGrid-cell": {
                backgroundColor: isDarkMode ? "#0d1117" : "#f3f4f6",
                color: isDarkMode ? "#c9d1d9" : "#1f2937",
                borderBottom: `1px solid ${isDarkMode ? "#21262d" : "#e5e7eb"}`,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: isDarkMode ? "#161b22" : "#e2e8f0",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Teams;
