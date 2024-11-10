import { Button } from "@/components/ui/button";
import { Form } from "../../_components/FromList";
import { Download, Loader2 } from "lucide-react";
import { GetFormResponses } from "@/app/actions/GetFormResponses";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import Link from "next/link";
type Responses =
  | {
      id: string;
      submittedBy: string;
      jsonUserResponse: string;
      formId: string;
      createdAt: string;
    }[]
  | undefined;
export const FormListItemResponse = ({ form }: { form: Form }) => {
  const jsonForm = JSON.parse(form.jsonform);
  const [formResponses, setFormResponses] = useState<Responses>([]);
  const [loading, setLoading] = useState(false);
  const user = useSession();
  const fetchFormResponses = async () => {
    const responses = await GetFormResponses(
      form.id,
      user.data?.user?.email as string
    );
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
    exportToExcel(jsonData);
  };

  const exportToExcel = (jsonDataResponses: Record<string, any>[]) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonDataResponses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${jsonForm.formTitle}.xlsx`);
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
          <strong>{formResponses?.length}</strong> Responses
        </div>
        <Button
          disabled={loading || user.status == "loading"}
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
