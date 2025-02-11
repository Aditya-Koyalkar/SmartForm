"use client";
import { GetMyForm } from "@/app/actions/GetMyForm";
import { ArrowLeft, Share2, SquareArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormUI, JSONForm } from "./FormUi";
import { UpdateFormDB } from "@/app/actions/UpdateForm";
import { toast } from "sonner";
import { Controller } from "./Controller";
import { ChangeThemeDB } from "@/app/actions/ChangeTheme";
import { ChangeBorderStyleDB } from "@/app/actions/UpdateStyle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RWebShare } from "react-web-share";
import { ChangeEnableAuthForm } from "@/app/actions/ChangeEnableAuthForm";
import { ApplyCustomStyling } from "@/app/actions/ApplyCustomStyles";

export type CustomStylesType = {
  id: string;
  imageUrl: string | null;
  theme: string;
  borderStyle: string;
  createdBy: string;
} | null;

export default function EditForm({
  formId,
  email,
  userCustomStyles,
}: {
  formId: string;
  email: string;
  userCustomStyles: CustomStylesType;
}) {
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
  const [updateTrigger, setUpdateTrigger] = useState<number>();
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [borderStyle, setBorderStyle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [authEnabled, setAuthEnabled] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const getMyForm = async () => {
      const res = await GetMyForm(formId);
      setJsonForm(JSON.parse(res?.jsonform as string));
      setSelectedTheme(res?.theme as string);
      setBorderStyle(res?.borderStyle as string);
      setAuthEnabled(res?.enableAuth as boolean);
      setImageUrl(res?.imageUrl as string);
    };
    getMyForm();
  }, [formId]);

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonDB();
    }
  }, [updateTrigger]);
  const updateJsonDB = async () => {
    await UpdateFormDB(JSON.stringify(jsonForm), formId, email as string);
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
    await UpdateFormDB(JSON.stringify(updatedJson), formId, email as string);
    toast("deleted");
  };

  const handleChangeTheme = async (theme: string) => {
    setSelectedTheme(theme);
    await ChangeThemeDB(theme, formId, email as string);
  };

  const handleBorderChange = async (style: string) => {
    setBorderStyle(style);
    await ChangeBorderStyleDB(style, formId, email as string);
  };

  const handleEnableAuthChange = async (value: boolean) => {
    await ChangeEnableAuthForm(value, formId, email as string);
    setAuthEnabled(value);
  };
  const handleSelectCustomStyle = async () => {
    await ApplyCustomStyling(
      formId,
      email,
      userCustomStyles?.theme as string,
      userCustomStyles?.imageUrl as string,
      userCustomStyles?.borderStyle as string
    );
    setSelectedTheme(userCustomStyles?.theme as string);
    setBorderStyle(userCustomStyles?.borderStyle as string);
    setImageUrl(userCustomStyles?.imageUrl as string);
  };

  const onFieldAdd = (label: string, placeholder: string) => {
    const newField = {
      fieldName: `field_${jsonForm.formFields.length + 1}`,
      placeholder: placeholder || "Enter placeholder",
      label: label || "New Field",
      fieldType: "text", // Default to text field; you can modify as needed
      required: true,
      options: [],
    };
    const updatedJson = {
      ...jsonForm,
      formFields: [...jsonForm.formFields, newField],
    };
    setJsonForm(updatedJson as JSONForm);
    setUpdateTrigger(Date.now());
  };

  return (
    <div className="p-5 md:p-10">
      <div className="flex items-center mb-3 justify-between">
        <div
          onClick={() => router.back()}
          className="flex gap-2 items-center my-5 cursor-pointer hover:text-primary lg:text-xl transition-all font-bold"
        >
          <ArrowLeft /> Back
        </div>

        <div className="flex gap-5">
          <Link href={`/live-ai-form/${formId}`} target="_blank">
            {" "}
            <Button className="flex gap-2">
              <SquareArrowUpRight className="h-5 w-5" />
              Live Preview
            </Button>
          </Link>
          <RWebShare
            data={{
              text: `${jsonForm.formSubHeading} : Built with SmartFormAI !`,
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/live-ai-form/${formId}`,
              title: `${jsonForm.formTitle}`,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button
              variant={"outline"}
              size={"sm"}
              className="flex items-center gap-2"
            >
              <Share2 className="h-5 w-5" />
              Share
            </Button>
          </RWebShare>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="p-5  md:w-[400px] border rounded-lg h-full">
            <Controller
              handleChangeTheme={handleChangeTheme}
              handleBorderChange={handleBorderChange}
              borderStyle={borderStyle}
              handleEnableAuthChange={handleEnableAuthChange}
              authEnabled={authEnabled}
              userCustomStyles={userCustomStyles}
              handleSelectCustomStyles={handleSelectCustomStyle}
            />
          </div>
          <div className="col-span-2 flex  rounded-xl justify-center  w-full h-full">
            <FormUI
              jsonForm={jsonForm}
              onFieldUpdate={onFieldUpdate}
              onDelete={onDeleteField}
              selectedTheme={selectedTheme}
              borderStyle={borderStyle}
              imageUrl={imageUrl}
              onFieldAdd={onFieldAdd}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
