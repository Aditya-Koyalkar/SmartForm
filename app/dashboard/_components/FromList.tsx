"use client";
import { GetAllUserForms } from "@/app/actions/GetAllUserForm";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FormDataItem } from "./FormDataItem";

export const FormList = () => {
  const { data: session } = useSession();
  const [formList, setFormList] = useState<Form[]>([]);

  useEffect(() => {
    fetchUserForms();
  }, [session]);
  const fetchUserForms = async () => {
    const forms = await GetAllUserForms(session?.user?.email as string);
    setFormList(forms ? forms : []);
  };
  return (
    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
      {formList.map((form, index: number) => (
        <div key={index}>
          <FormDataItem form={form} refetchData={fetchUserForms} />
        </div>
      ))}
    </div>
  );
};

export type Form = {
  id: string;
  jsonform: string;
  theme: string;
  borderStyle: string;
  createdBy: string;
  createdAt: string;
};
