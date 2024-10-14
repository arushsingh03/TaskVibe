"use client";

import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { useAppSelector } from "../redux";
import { useGetUsersQuery, User } from "@/state/api";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { dataGridSxStyles } from "@/lib/utils";

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef<User>[] = [
  { field: "userId", headerName: "ID", width: 100, type: "number" },
  { field: "username", headerName: "Username", width: 150, type: "string" },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={40}
            height={40}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading)
    return <div className="mt-20 text-center text-xl">Loading...</div>;
  if (isError || !users)
    return (
      <div className="mt-20 text-center text-red-500">Error fetching users</div>
    );

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        isDarkMode ? "from-gray-900 to-cyan-900" : "from-gray-300 to-gray-800"
      } p-8`}
    >
      <Header name="Users" />

      <div
        className={`mt-10 rounded-lg p-6 shadow-lg ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-800 to-cyan-800"
            : "bg-gradient-to-br from-white to-gray-300"
        }`}
      >
        <div className="overflow-hidden" style={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={users || []}
            columns={columns}
            getRowId={(row) => row.userId ?? 0} // Provide a fallback value (e.g., 0)
            pagination
            slots={{ toolbar: CustomToolbar }}
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

export default Users;
