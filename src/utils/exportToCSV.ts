import type { Character } from "../types/character";

export const exportToCSV = (data: Character[]) => {
  const headers = ["name", "ki", "maxKi", "race", "gender", "affiliation"];

  const rows = data.map((c) =>
    headers.map((h) => `"${(c as any)[h] ?? ""}"`).join(","),
  );

  const csv = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "characters.csv";
  link.click();

  URL.revokeObjectURL(url);
};
