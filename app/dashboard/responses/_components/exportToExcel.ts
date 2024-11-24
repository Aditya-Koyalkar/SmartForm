import * as XLSX from "xlsx";

export const exportToExcel = (
  jsonDataResponses: Record<string, any>[],
  title: string
) => {
  const worksheet = XLSX.utils.json_to_sheet(jsonDataResponses);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${title}.xlsx`);
};
