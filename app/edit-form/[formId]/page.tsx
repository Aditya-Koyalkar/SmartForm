"use client";
import { Spinner } from "@/app/_components/Spinner";
import { GetMyForm } from "@/app/actions/GetMyForm";
import { ArrowLeft } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormUI, JSONForm } from "./_components/FormUi";
import { UpdateFormDB } from "@/app/actions/UpdateForm";
import { toast } from "sonner";
import { Controller } from "./_components/Controller";
import { ChangeThemeDB } from "@/app/actions/ChangeTheme";
import { ChangeBorderStyleDB } from "@/app/actions/UpdateStyle";

export default function EditForm({ params }: { params: any }) {
  const formId = params.formId;
  const user = useSession();
  const [jsonForm, setJsonForm] = useState<JSONForm>({
    formTitle: "",
    formSubHeading: "",
    formFields: [
      {
        firstName: "",
        placeholder: "",
        label: "",
        fieldType: "",
        required: true,
        options: [],
      },
    ],
  });
  const [updateTrigger, setUpdateTrigger] = useState<number>();
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [borderStyle, setBorderStyle] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getMyForm = async () => {
      const res = await GetMyForm(formId);
      setJsonForm(JSON.parse(res?.jsonform as string));
      setSelectedTheme(res?.theme as string);
      setBorderStyle(res?.borderStyle as string);
    };
    getMyForm();
  }, [formId, user]);

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonDB();
    }
  }, [updateTrigger]);
  const updateJsonDB = async () => {
    const result = await UpdateFormDB(
      JSON.stringify(jsonForm),
      formId,
      user.data?.user?.email as string
    );
    toast("Updated!!");
  };
  const onFieldUpdate = (label: string, placeholder: string, index: number) => {
    jsonForm.formFields[index].label = label;
    jsonForm.formFields[index].placeholder = placeholder;
    setUpdateTrigger(Date.now());
  };

  const onDeleteField = async (index: number) => {
    const updatedJson = {
      ...jsonForm,
      formFields: jsonForm.formFields.filter((field, i) => i != index),
    };
    setJsonForm(updatedJson as JSONForm);
    await UpdateFormDB(
      JSON.stringify(updatedJson),
      formId,
      user.data?.user?.email as string
    );
    toast("deleted");
  };
  if (user.status == "unauthenticated") {
    signIn();
  }
  if (user.status == "loading") {
    return <Spinner />;
  }

  const handleChangeTheme = async (theme: string) => {
    setSelectedTheme(theme);
    await ChangeThemeDB(theme, formId, user.data?.user?.email as string);
  };

  const handleBorderChange = async (style: string) => {
    setBorderStyle(style);
    await ChangeBorderStyleDB(style, formId, user.data?.user?.email as string);
  };
  return (
    <div className="p-10">
      <div
        onClick={() => router.back()}
        className="flex gap-2 items-center my-5 cursor-pointer hover:text-primary lg:text-xl transition-all font-bold"
      >
        <ArrowLeft /> Back
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="p-5  md:w-[400px] border rounded-lg h-full">
            <Controller
              handleChangeTheme={handleChangeTheme}
              handleBorderChange={handleBorderChange}
              borderStyle={borderStyle}
            />
          </div>
          <div className="col-span-2 flex  rounded-xl   w-full h-full">
            <FormUI
              jsonForm={jsonForm}
              onFieldUpdate={onFieldUpdate}
              onDelete={onDeleteField}
              selectedTheme={selectedTheme}
              borderStyle={borderStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
