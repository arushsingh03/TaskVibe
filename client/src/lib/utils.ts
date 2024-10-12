export const dataGridSxStyles = (isDarkMode: boolean) => ({
  "& .MuiDataGrid-columnHeaders": {
    background: isDarkMode
      ? "linear-gradient(90deg, #2b2e4a, #1f1f3a)"
      : "linear-gradient(90deg, #d1d5db, #111827)",
    color: isDarkMode ? "#1f2937" : "#1e293b",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.1rem",
    padding: "0.75rem",
    display: "flex",
    alignItems: "center",
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
    transition: "background-color 0.3s, transform 0.2s ease",
    "&:hover": {
      backgroundColor: isDarkMode ? "#383b5b" : "#6b7280",
      transform: "scale(1.02)",
      color: isDarkMode ? "#fafafa" : "#0d0d0d",
    },
  },

  "& .MuiDataGrid-row": {
    transition: "background-color 0.3s ease-in-out, transform 0.2s",
    "&:hover": {
      backgroundColor: isDarkMode ? "#2e2e4e" : "#d1d5db",
      transform: "translateX(5px)",
      cursor: "pointer",
    },
  },

  "& .MuiIconButton-root": {
    color: isDarkMode ? "#c3bafc" : "#5b647e",
    transition: "color 0.2s, transform 0.2s ease",
    "&:hover": {
      color: isDarkMode ? "#e4e1fc" : "#1e293b",
      transform: "rotate(15deg)",
    },
  },

  "& .MuiTablePagination-root": {
    color: isDarkMode ? "#d1d5db" : "#1f2937",
    background: isDarkMode ? "#1c1f3a" : "#9ca3af",
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
      : "linear-gradient(to right, #111827, #ffffff)",
  },

  "& .MuiDataGrid-withBorderColor": {
    borderColor: `${isDarkMode ? "#4e4e6e" : "#cbd5e1"}`,
  },
});
