"use client";
import { Spinner } from "@/app/_components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AIChatSession } from "@/config/AiModel";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { useState } from "react";
import { CreateFormAction } from "@/app/actions/CreateForm";
import { useRouter } from "next/navigation";

export const CreateForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const data = useSession();
  const router = useRouter();
  if (data.status == "unauthenticated") {
    signIn();
  }
  if (data.status == "loading") {
    return <Spinner />;
  }
  const onCreateForm = async () => {
    const prompt = `Description: ${userInput} , On the basis of the given description please give form in json format with form title , form subheading and formFields which have fieldName , placeholder,label,fieldType except file,required ,options if it is a select type or radio or checkbox type else empty []  and provide in the format , for radio {formTitle : string,formSubHeading : string , formFields : [{fieldName : string,placeholder : string , label : string , fieldType : string , required : boolean},options : [string]]}`;
    setLoading(true);
    const result = await AIChatSession.sendMessage(prompt);
    if (result.response.text()) {
      const res = await CreateFormAction(
        result.response.text(),
        data.data?.user?.email as string
      );
      setLoading(false);
      setOpen(false);
      router.push(`/edit-form/${res?.id}`);
    }
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>+ Create new Form</Button>
        </DialogTrigger>
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Create new Form</DialogTitle>
            <DialogDescription>
              <Textarea
                onChange={(e) => setUserInput(e.target.value)}
                className="my-2 text-black text-[18px]"
                placeholder="Write the description about the Form you want to create"
              />
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-3">
            <Button onClick={() => setOpen(false)} variant={"destructive"}>
              Cancel
            </Button>
            <Button onClick={onCreateForm} disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <span>Creating</span>
                  <SmallSpinner />
                </span>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
const SmallSpinner = () => {
  return (
    <div className="flex justify-center items-center ml-2">
      <div className="w-4 h-4 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};
