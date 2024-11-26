"use client";
import { useEffect, useState } from "react";
import { FormDataItem } from "./FormDataItem";
import { GetAllUserForms } from "@/app/actions/GetAllUserForm";
type FormType = {
  id: string;
  jsonform: string;
  theme: string;
  borderStyle: string;
  enableAuth: boolean;
  createdBy: string;
  createdAt: string;
};
export const FormList = ({ email }: { email: string }) => {
  const [formList, setFormList] = useState<FormType[]>([]);
  const fetchUserForms = async () => {
    const forms = await GetAllUserForms(email);
    setFormList(forms as FormType[]);
  };
  useEffect(() => {
    fetchUserForms();
  }, []);
  if (formList.length == 0) {
    return (
      <div className="mt-20 w-full  flex justify-center ">
        You don&apos;t have any forms currently.
      </div>
    );
  }
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
      {formList.map((form, index: number) => (
        <div key={index}>
          <FormDataItem
            form={form}
            email={email}
            fetchUserForms={fetchUserForms}
          />
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
