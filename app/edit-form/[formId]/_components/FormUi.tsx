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

export const FormUI = ({ jsonForm }: { jsonForm: JSONForm }) => {
  return (
    <div className="md:w-[600px] border rounded-xl p-6">
      <div className="font-bold text-center text-xl">{jsonForm.formTitle}</div>
      <div className="text-sm text-gray-400 text-center">
        {jsonForm.formSubHeading}
      </div>
      <div className="flex flex-col gap-4 mt-3">
        {jsonForm.formFields.map((field, index) => (
          <div key={index}>
            {field.fieldType == "select" ? (
              <div className="flex flex-col gap-1">
                <div className="font-semibold">{field.label}</div>
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
                <Label className="font-semibold">{field.label}</Label>
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
                <Label className="font-semibold" htmlFor={field.firstName}>
                  {field.label}
                </Label>
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
                <Label className="font-semibold" htmlFor={field.firstName}>
                  {field.label}
                </Label>
                <Input
                  placeholder={field.placeholder}
                  type={field.fieldType}
                  name={field.firstName}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export type JSONForm = {
  formTitle: string;
  formSubHeading: string;
  formFields: [
    {
      firstName: string;
      placeholder: string;
      label: string;
      fieldType: string;
      required: boolean;
      options: [];
    }
  ];
};
