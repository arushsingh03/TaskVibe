export const dataGridClassNames = `
  border border-transparent bg-gradient-to-br from-[#d1d5db] via-[#6b7280] to-[#111827] 
  dark:from-[#2b2e4a] dark:via-[#1f1f3a] dark:to-[#1c1f3a] 
  text-gray-800 shadow-xl 
  dark:text-gray-300 rounded-xl overflow-hidden
`;

export const dataGridSxStyles = (isDarkMode: boolean) => ({
  "& .MuiDataGrid-columnHeaders": {
    background: isDarkMode
      ? "linear-gradient(90deg, #2b2e4a, #1f1f3a)"
      : "linear-gradient(90deg, #3B82F6, #3B82F6)",
    color: isDarkMode ? "#1f2937" : "#1e293b",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.1rem",
    padding: "0.75rem",
    display: "flex",
    gap: "0.5rem",
    borderBottom: `2px solid ${isDarkMode ? "#4e4e6e" : "#94a3b8"}`,
    "& svg": {
      fontSize: "1.2rem",
      color: isDarkMode ? "#1f2937" : "#111827",
    },
  },

  "& .MuiDataGrid-iconButtonContainer": {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },

  "& .MuiDataGrid-cell": {
    border: "none",
    color: isDarkMode ? "#e0e7ff" : "#0f172a",
    fontSize: "0.95rem",
    fontWeight: "500",
    "&:hover": {
      backgroundColor: isDarkMode ? "#383b5b" : "#6b7280",
      color: isDarkMode ? "#fafafa" : "#0d0d0d",
    },
  },

  "& .MuiDataGrid-row": {
    "&:hover": {
      backgroundColor: isDarkMode ? "#2e2e4e" : "#d1d5db",
      cursor: "pointer",
    },
  },

  "& .MuiIconButton-root": {
    color: isDarkMode ? "#c3bafc" : "#5b647e",
    "&:hover": {
      color: isDarkMode ? "#e4e1fc" : "#1e293b",
    },
  },

  "& .MuiTablePagination-root": {
    color: isDarkMode ? "#d1d5db" : "#1f2937",
    background: isDarkMode ? "#1c1f3a" : "#3B82F6",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    "& svg": {
      fontSize: "1.2rem",
    },
  },

  "& .MuiTablePagination-selectIcon": {
    color: isDarkMode ? "#1f2937" : "#111827",
  },

  "& .MuiDataGrid-footerContainer": {
    borderTop: `1px solid ${isDarkMode ? "#4e4e6e" : "#cbd5e1"}`,
    background: isDarkMode
      ? "linear-gradient(to right, #1f1f3a, #2b2e4a)"
      : "linear-gradient(to right, #3B82F6, #3B82F6)",
  },

  "& .MuiDataGrid-withBorderColor": {
    borderColor: `${isDarkMode ? "#4e4e6e" : "#cbd5e1"}`,
  },
});

