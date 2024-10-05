"use client";
import { Spinner } from "@/app/_components/Spinner";
import { GetMyForm } from "@/app/actions/GetMyForm";
import { ArrowLeft } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormUI, JSONForm } from "./_components/FormUi";

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
  const router = useRouter();
  useEffect(() => {
    const getMyForm = async () => {
      const res = await GetMyForm(formId);
      setJsonForm(JSON.parse(res?.jsonform as string));
    };
    getMyForm();
  }, [formId, user]);
  console.log(jsonForm);

  if (user.status == "unauthenticated") {
    signIn();
  }
  if (user.status == "loading") {
    return <Spinner />;
  }
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
          <div className="p-5  md:w-[400px] border rounded-lg">Controller</div>
          <div className="col-span-2 flex  rounded-xl   w-full h-full">
            <FormUI jsonForm={jsonForm} />
          </div>
        </div>
      </div>
    </div>
  );
}
