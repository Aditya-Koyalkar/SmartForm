"use client";

import { GetMyForm } from "@/app/actions/GetMyForm";
import { JSONForm } from "@/app/edit-form/[formId]/_components/FormUi";
import { useEffect, useState } from "react";
import { LiveFormUI } from "./_components/LiveForm";
import Link from "next/link";
import { MdOutlineFormatAlignLeft } from "react-icons/md";

export default function LiveAIForm({ params }: { params: { formId: string } }) {
  const { formId } = params;
  const [jsonForm, setJsonForm] = useState<JSONForm>({
    formTitle: "",
    formSubHeading: "",
    formFields: [
      {
        fieldName: "",
        placeholder: "",
        label: "",
        fieldType: "",
        required: true,
        options: [],
      },
    ],
  });
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [borderStyle, setBorderStyle] = useState("");
  const [authEnabled, setAuthEnabled] = useState<boolean>(false);
  useEffect(() => {
    const fetchMyForm = async () => {
      const res = await GetMyForm(formId);
      setJsonForm(JSON.parse(res?.jsonform as string));
      setSelectedTheme(res?.theme as string);
      setBorderStyle(res?.borderStyle as string);
      setAuthEnabled(res?.enableAuth as boolean);
    };
    fetchMyForm();
  }, [params]);

  return (
    <div className="px-5 py-10 flex flex-col justify-center">
      <div className="flex justify-center">
        <LiveFormUI
          formId={formId}
          jsonForm={jsonForm as JSONForm}
          selectedTheme={selectedTheme}
          borderStyle={borderStyle}
          authEnabled={authEnabled}
        />
      </div>
      <Link
        href={process.env.NEXT_PUBLIC_BASE_URL as string}
        className="cursor-pointer md:fixed bottom-3 left-3 mt-6"
      >
        <div className="flex items-center">
          <MdOutlineFormatAlignLeft className="h-[25px] w-[25px] text-black" />{" "}
          Build Your Form with SmartFormAI
        </div>
      </Link>
    </div>
  );
}
