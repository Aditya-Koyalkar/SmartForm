"use client";
import { Spinner } from "@/app/_components/Spinner";
import { signIn, useSession } from "next-auth/react";
import { Form } from "../_components/FromList";
import { useEffect, useState } from "react";
import { GetAllUserForms } from "@/app/actions/GetAllUserForm";
import { FormListItemResponse } from "./_components/FormListItemResponse";

export default function Responses() {
  const [formList, setFormList] = useState<Form[]>([]);
  const user = useSession();
  useEffect(() => {
    fetchUserForms();
  }, [user]);
  const fetchUserForms = async () => {
    const forms = await GetAllUserForms(user.data?.user?.email as string);
    setFormList(forms ? forms : []);
  };

  if (user.status == "loading") {
    return <Spinner />;
  }
  if (user.status == "unauthenticated") {
    signIn();
  }
  return (
    <div className="p-10">
      <div className="font-bold text-3xl flex items-center justify-between">
        <div>Responses</div>
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
        {formList.map((form, index) => (
          <FormListItemResponse form={form} key={index} />
        ))}
      </div>
    </div>
  );
}
