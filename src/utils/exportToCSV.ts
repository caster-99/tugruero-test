export const exportToCSV = (data: any[], headers: string[]) => {
  const rows = data.map((c) =>
    headers.map((h) => `"${(c as any)[h] ?? ""}"`).join(","),
  );

  const csv = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "export.csv";
  link.click();

  URL.revokeObjectURL(url);
};
