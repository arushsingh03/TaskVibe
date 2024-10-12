export const dataGridClassNames = `
  border border-gray-300 bg-white shadow-lg 
  dark:border-gray-700 dark:bg-dark-secondary dark:text-gray-300 
  rounded-lg overflow-hidden transition-all duration-300 ease-in-out
`;

export const dataGridSxStyles = (isDarkMode: boolean) => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: isDarkMode ? "#2e2e2e" : "#f3f4f6",
    color: isDarkMode ? "#d1d5db" : "#374151",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.07rem",
    borderBottom: `2px solid ${isDarkMode ? "#424242" : "#d1d5db"}`,
  },
  '& [role="row"] > *': {
    backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
    borderColor: `${isDarkMode ? "#424242" : "#e5e7eb"}`,
    transition: "background-color 0.3s ease-in-out",
  },
  "& .MuiDataGrid-cell": {
    border: "none",
    color: isDarkMode ? "#e0e0e0" : "#111827",
    fontSize: "0.9rem",
    fontWeight: "500",
    "&:hover": {
      backgroundColor: isDarkMode ? "#3a3a3a" : "#f3f4f6",
      color: isDarkMode ? "#ffffff" : "#111827",
    },
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: isDarkMode ? "#3a3a3a" : "#e5e7eb",
    cursor: "pointer",
  },
  "& .MuiIconButton-root": {
    color: isDarkMode ? "#a3a3a3" : "#6b7280",
    transition: "color 0.2s ease",
  },
  "& .MuiIconButton-root:hover": {
    color: isDarkMode ? "#d1d5db" : "#374151",
  },
  "& .MuiTablePagination-root": {
    color: isDarkMode ? "#c4c4c4" : "#374151",
  },
  "& .MuiTablePagination-selectIcon": {
    color: isDarkMode ? "#c4c4c4" : "#6b7280",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: `1px solid ${isDarkMode ? "#424242" : "#e5e7eb"}`,
    backgroundColor: isDarkMode ? "#2e2e2e" : "#f3f4f6",
  },
  "& .MuiDataGrid-withBorderColor": {
    borderColor: `${isDarkMode ? "#424242" : "#e5e7eb"}`,
  },
});
