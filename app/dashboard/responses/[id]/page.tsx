"use client";

import { GetFormResponses } from "@/app/actions/GetFormResponses";
import { GetMyForm } from "@/app/actions/GetMyForm";
import { useEffect, useState } from "react";

type FormResponseType = {
  id: string;
  submittedBy: string;
  jsonUserResponse: string;
  formId: string;
  createdAt: string;
};

export default function FormResponse({ params }: { params: { id: string } }) {
  const formId = params.id;
  const user = JSON.parse(localStorage.getItem("userInfo") || "");
  const [responses, setResponses] = useState<FormResponseType[]>();
  useEffect(() => {
    fetchFormResponses();
  }, [formId]);
  const fetchFormResponses = async () => {
    const result = await GetFormResponses(formId, user.email);
    setResponses(result);
  };
  return <div>{}</div>;
}
