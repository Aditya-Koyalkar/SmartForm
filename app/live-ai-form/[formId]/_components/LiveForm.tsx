import { CheckUserSubmitted } from "@/app/actions/CheckUserSubmitted";
import { CreateFormResponse } from "@/app/actions/CreateFormResponse";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signIn, useSession } from "next-auth/react";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const LiveFormUI = ({
  jsonForm,
  selectedTheme,
  borderStyle,
  formId,
  authEnabled,
}: {
  jsonForm: JSONForm;
  selectedTheme: string;
  borderStyle: string;
  formId: string;
  authEnabled: boolean;
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const user = useSession();
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  useEffect(() => {
    if (authEnabled) fetchUserSubmitted();
  }, [authEnabled]);

  const fetchUserSubmitted = async () => {
    const submitted = await CheckUserSubmitted(
      user.data?.user?.email as string
    );
    setCanSubmit(submitted as boolean);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (
    option: string,
    fieldName: string,
    value: any
  ) => {
    const list = formData?.[fieldName] ? formData?.[fieldName] : [];
    if (value) {
      list.push({
        option: option,
        value: value,
      });
      setFormData({
        ...formData,
        [fieldName]: list,
      });
    } else {
      const result = list.filter((item: any) => item.option != option);
      setFormData({
        ...formData,
        [fieldName]: result,
      });
    }
  };
  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    const submittedBy = authEnabled ? user.data?.user?.email : "";
    await CreateFormResponse(
      JSON.stringify(formData),
      formId,
      submittedBy as string
    );
    toast("Response Submitted SuccessFully");
    formRef.current?.reset();
    fetchUserSubmitted();
  };

  if (!canSubmit) {
    return (
      <div className="h-[80px] w-full shadow-lg text-center">
        your response is already received . Thank you!
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
      className={`md:w-[600px] rounded-xl p-6 shadow-md ${borderStyle}`}
      data-theme={selectedTheme}
    >
      <div className="font-bold text-center text-xl">{jsonForm.formTitle}</div>
      <div className="text-sm text-gray-400 text-center">
        {jsonForm.formSubHeading}
      </div>
      <div className="flex flex-col gap-4 mt-3">
        {jsonForm.formFields.map((field, index) => (
          <div key={index}>
            {field.fieldType == "select" ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <Label
                    className="font-semibold w-[96%]"
                    htmlFor={field.fieldName}
                  >
                    {field.label}
                  </Label>
                </div>
                <Select
                  required={field.required}
                  onValueChange={(value) =>
                    handleSelectChange(field.fieldName, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : field.fieldType == "radio" ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <Label
                    className="font-semibold w-[96%]"
                    htmlFor={field.fieldName}
                  >
                    {field.label}
                  </Label>
                </div>
                <RadioGroup defaultValue="option-one">
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        onClick={() =>
                          handleSelectChange(field.fieldName, option)
                        }
                        value={option}
                        id={option}
                      />
                      <Label htmlFor="">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : field.fieldType == "checkbox" ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <Label
                    className="font-semibold w-[96%]"
                    htmlFor={field.fieldName}
                  >
                    {field.label}
                  </Label>
                </div>
                <div className="grid grid-cols-2  md:grid-cols-3 gap-2 ">
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Checkbox
                        onCheckedChange={(value) => {
                          handleCheckboxChange(option, field.fieldName, value);
                        }}
                      />
                      <Label>{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <Label
                    className="font-semibold w-[96%]"
                    htmlFor={field.fieldName}
                  >
                    {field.label}
                  </Label>
                </div>
                <Input
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  type={field.fieldType}
                  name={field.fieldName}
                  required={field.required}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center my-2 mt-6">
        {authEnabled && user.status == "unauthenticated" ? (
          <button
            className="btn btn-primary"
            onClick={() =>
              signIn(undefined, {
                callbackUrl:
                  process.env.NEXT_PUBLIC_BASE_URL + "/live-ai-form/" + formId,
              })
            }
          >
            Sign In to Submit the form
          </button>
        ) : (
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export type JSONForm = {
  formTitle: string;
  formSubHeading: string;
  formFields: [
    {
      fieldName: string;
      placeholder: string;
      label: string;
      fieldType: string;
      required: boolean;
      options: [];
    }
  ];
};
