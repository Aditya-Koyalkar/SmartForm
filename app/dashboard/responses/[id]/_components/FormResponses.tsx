"use client";
import { useState } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIChatSession } from "@/config/AiModel";
import { Download, Loader2 } from "lucide-react";
import { exportToExcel } from "../../_components/exportToExcel";

type FormType = {
  id: string;
  jsonform: string;
  theme: string;
  borderStyle: string;
  enableAuth: boolean;
  createdBy: string;
  createdAt: string;
};

const FormResponses = ({
  responses,
  form,
}: {
  responses: any[];
  form: FormType;
}) => {
  const [filteredResponses, setFilteredResponses] = useState(responses);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredResponses.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentResponses = filteredResponses.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const headings = Object.keys(filteredResponses[0]);
  const jsonForm = JSON.parse(form.jsonform);

  const handleFilterResponses = async () => {
    const prompt = `
I have a list of form responses in JSON format. Each response is an object with multiple key-value pairs. 
I will provide a filter text, and you need to filter the responses based on whether the values of any keys match the filter text. 

- The filtering should be case-insensitive. 
- The filtered result should maintain the original structure of the response objects without altering or omitting any keys.
- If no responses match the filter text, return an empty list.
- Preserve all keys and values in the filtered responses exactly as they are.

Here is an example of the data:
Responses: ${JSON.stringify(responses)}

Filter Text: ${filter}

Based on the filter text, return the filtered responses.
`;
    setLoading(true);
    const result = await AIChatSession.sendMessage(prompt);
    setLoading(false);
    console.log(result.response.text());
    setFilteredResponses(JSON.parse(result.response.text()));
  };
  if (!Array.isArray(filteredResponses)) {
    setFilteredResponses(responses);
  }
  const handleExportData = () => {
    exportToExcel(filteredResponses, jsonForm?.formTitle);
  };

  return (
    <div className="p-5">
      <div className="w-full p-2 flex justify-between">
        <div className="flex gap-3 items-center">
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter out with AI"
          />
          <Button
            disabled={loading}
            onClick={handleFilterResponses}
            className="flex gap-3 items-center"
          >
            {loading ? (
              <>
                Applying <Loader2 className="w-5 h-5 animate-spin" />
              </>
            ) : (
              "Apply Filters"
            )}
          </Button>
          <Button
            variant={"outline"}
            disabled={loading}
            onClick={handleExportData}
            className="flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Download />}
            Export
          </Button>
        </div>
        <Button
          onClick={() => {
            setFilteredResponses(responses);
            setFilter("");
          }}
          variant={"outline"}
          className="flex gap-2 items-center"
        >
          Reset Responses
          <FaArrowRotateLeft />
        </Button>
      </div>
      <div className="mt-5 max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1100px] overflow-x-auto">
        <Table>
          <TableCaption>
            Responses of the <b>{jsonForm?.formTitle}</b>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>SNo</TableHead>
              {headings.map((heading, i) => (
                <TableHead key={i}>{heading}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentResponses.map((response, i) => (
              <TableRow key={i}>
                <TableCell>{(currentPage - 1) * 10 + i + 1}</TableCell>
                {headings.map((key, j) => (
                  <TableCell key={j}>{response[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex fixed bottom-5 right-5 justify-between gap-5 items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormResponses;
