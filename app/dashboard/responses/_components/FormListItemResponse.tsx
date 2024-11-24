"use client";
import { Button } from "@/components/ui/button";
import { Form } from "../../_components/FromList";
import { Download, Loader2 } from "lucide-react";
import { GetFormResponses } from "@/app/actions/GetFormResponses";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { exportToExcel } from "./exportToExcel";
type Responses =
  | {
      id: string;
      submittedBy: string;
      jsonUserResponse: string;
      formId: string;
      createdAt: string;
    }[]
  | undefined;
export const FormListItemResponse = ({
  form,
  email,
}: {
  form: Form;
  email: string;
}) => {
  const jsonForm = JSON.parse(form.jsonform);
  const [formResponses, setFormResponses] = useState<Responses>([]);
  const [loading, setLoading] = useState(false);
  const fetchFormResponses = async () => {
    const responses = await GetFormResponses(form.id, email as string);
    setFormResponses(responses);
  };
  useEffect(() => {
    setLoading(true);
    fetchFormResponses();
    setLoading(false);
  }, [form.id]);

  const handleExportData = async () => {
    setLoading(true);

    const jsonData: Record<string, any>[] = [];
    if (formResponses) {
      formResponses.forEach((item) => {
        const jsonItem = JSON.parse(item.jsonUserResponse);
        jsonData.push(jsonItem);
      });
    } else {
      toast("No Responses");
    }
    setLoading(false);
    exportToExcel(jsonData, jsonForm.formTitle);
  };

  return (
    <Link
      href={`/dashboard/responses/${form.id}`}
      className="border shadow-md rounded-lg p-4 cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div>{form.createdAt}</div>
      </div>
      <hr className="my-4" />
      <div className=" text-lg">{jsonForm.formTitle}</div>
      <div className="text-sm text-slate-600">{jsonForm.formSubHeading}</div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <div className="sm">
          <strong>{formResponses?.length}</strong>{" "}
          <span className="underline">Responses</span>
        </div>
        <Button
          disabled={loading}
          onClick={handleExportData}
          size={"sm"}
          className="flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Download />}
          Export
        </Button>
      </div>
    </Link>
  );
};
