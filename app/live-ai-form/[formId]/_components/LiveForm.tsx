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

import React, { useState } from "react";

export const LiveFormUI = ({
  jsonForm,
  selectedTheme,
  borderStyle,
}: {
  jsonForm: JSONForm;
  selectedTheme: string;
  borderStyle: string;
}) => {
  const [formData, setFormData] = useState<any>();

  const handleInputChange = (e: any) => {
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

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
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
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
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
