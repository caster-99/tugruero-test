import { exportToCSV } from "../../utils/exportToCSV";
import { Button } from "../Button/Button";
import { useState } from "react";

interface ExportCSVButtonProps<T> {
  data: T[];
  columns: { key: string; label: string }[];
  filename?: string;
  fetchAllUnfiltered: () => Promise<T[]>;
}

export function ExportCSVButton<T>({
  data,
  columns,
  fetchAllUnfiltered,
}: ExportCSVButtonProps<T>) {
  const [showOptions, setShowOptions] = useState(false);
  const [isExportingAll, setIsExportingAll] = useState(false);

  const handleExportFiltered = () => {
    exportToCSV(
      data as any[],
      columns.map((col) => col.key),
    );
    setShowOptions(false);
  };

  const handleExportAll = async () => {
    try {
      setIsExportingAll(true);
      const allData = await fetchAllUnfiltered();
      exportToCSV(
        allData as any[],
        columns.map((col) => col.key),
      );
    } catch (error) {
      console.error("Failed to export all data:", error);
    } finally {
      setIsExportingAll(false);
      setShowOptions(false);
    }
  };

  return (
    <div className="export-csv-container" style={{ position: "relative" }}>
      <Button
        onClick={() => setShowOptions(!showOptions)}
        title="Exportar información en formato CSV"
      >
        Exportar CSV
      </Button>

      {showOptions && (
        <div 
          className="export-options"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "var(--surface)",
            border: "1px solid var(--surface-secondary)",
            borderRadius: "4px",
            zIndex: 10,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            minWidth: "180px"
          }}
        >
          <button 
            onClick={handleExportFiltered}
            style={{ 
              background: "none", 
              border: "none", 
              color: "inherit", 
              cursor: "pointer",
              textAlign: "left",
              padding: "4px 8px"
            }}
          >
            Exportar filtrados ({data.length})
          </button>
          <button 
            onClick={handleExportAll}
            disabled={isExportingAll}
            style={{ 
              background: "none", 
              border: "none", 
              color: "inherit", 
              cursor: "pointer",
              textAlign: "left",
              padding: "4px 8px",
              opacity: isExportingAll ? 0.5 : 1
            }}
          >
            {isExportingAll ? "Cargando..." : "Exportar base completa"}
          </button>
        </div>
      )}
    </div>
  );
}

