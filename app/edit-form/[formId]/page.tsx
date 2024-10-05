"use client";
import { Spinner } from "@/app/_components/Spinner";
import { GetMyForm } from "@/app/actions/GetMyForm";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function EditForm({ params }: { params: any }) {
  const formId = params.formId;
  const user = useSession();
  const [jsonForm, setJsonForm] = useState({});
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
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div>Controller</div>
        <div className="col-span-2">Form</div>
      </div>
    </div>
  );
}
