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
    <div className="export-csv-container">
      <Button
        onClick={() => setShowOptions(!showOptions)}
        title="Exportar información en formato CSV"
      >
        Exportar CSV
      </Button>

      {showOptions && (
        <div className="export-options">
          <button onClick={handleExportFiltered}>
            Exportar filtrados ({data.length})
          </button>
          <button 
            onClick={handleExportAll}
            disabled={isExportingAll}
          >
            {isExportingAll ? "Cargando..." : "Exportar base completa"}
          </button>
        </div>
      )}
    </div>
  );
}

