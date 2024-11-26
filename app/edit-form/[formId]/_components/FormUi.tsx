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

import React from "react";
import { FieldEdit } from "./FieldEdit";
import Image from "next/image";

export const FormUI = ({
  jsonForm,
  selectedTheme,
  borderStyle,
  imageUrl,
  onFieldUpdate,
  onDelete,
}: {
  jsonForm: JSONForm;
  selectedTheme: string;
  borderStyle: string;
  imageUrl: string;
  onFieldUpdate: (label: string, placeholder: string, index: number) => void;
  onDelete: (index: number) => void;
}) => {
  return (
    <div
      className={`md:w-[600px] rounded-xl p-6 shadow-md ${borderStyle}`}
      data-theme={selectedTheme}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          height={200}
          width={200}
          alt="bg"
          className="w-full max-h-[150px]"
        />
      )}
      <div className="font-bold text-center text-xl mt-3">
        {jsonForm.formTitle}
      </div>
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
                  <FieldEdit
                    defaultValue={field}
                    onUpdate={(label, placeholder) => {
                      onFieldUpdate(label, placeholder, index);
                    }}
                    onDelete={() => onDelete(index)}
                  />
                </div>
                <Select>
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
                  <FieldEdit
                    defaultValue={field}
                    onUpdate={(label, placeholder) => {
                      onFieldUpdate(label, placeholder, index);
                    }}
                    onDelete={() => onDelete(index)}
                  />
                </div>
                <RadioGroup defaultValue="option-one">
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
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
                  <FieldEdit
                    defaultValue={field}
                    onUpdate={(label, placeholder) => {
                      onFieldUpdate(label, placeholder, index);
                    }}
                    onDelete={() => onDelete(index)}
                  />
                </div>
                <div className="grid grid-cols-2  md:grid-cols-3 gap-2 ">
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Checkbox />
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
                  <FieldEdit
                    defaultValue={field}
                    onUpdate={(label, placeholder) => {
                      onFieldUpdate(label, placeholder, index);
                    }}
                    onDelete={() => onDelete(index)}
                  />
                </div>
                <Input
                  placeholder={field.placeholder}
                  type={field.fieldType}
                  name={field.fieldName}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center my-2 mt-6">
        <button className="btn btn-primary">Submit</button>
      </div>
    </div>
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
