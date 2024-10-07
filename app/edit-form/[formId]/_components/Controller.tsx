"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Themes } from "../../_data/Theme";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Controller = ({
  handleChangeTheme,
  handleBorderChange,
  handleEnableAuthChange,
  borderStyle,
  authEnabled,
}: {
  handleChangeTheme: (value: string) => void;
  handleBorderChange: (value: string) => void;
  handleEnableAuthChange: (value: boolean) => void;
  authEnabled: boolean;
  borderStyle: string;
}) => {
  const [borderChecked, setBorderChecked] = useState<boolean>();
  const [authEnabledForm, setAuthEnabledForm] = useState<boolean>(false);
  const toggleBorder = () => {
    setBorderChecked(!borderChecked);
    handleBorderChange(!borderChecked ? "border-2 border-primary" : "");
  };
  const toggleAuthEnable = () => {
    setAuthEnabledForm(!authEnabledForm);
    handleEnableAuthChange(!authEnabledForm);
  };
  useEffect(() => {
    setBorderChecked(!!borderStyle);
    setAuthEnabledForm(authEnabled);
  }, [borderStyle, authEnabled]);

  return (
    <div>
      <Label className="font-semibold text-lg">Select Theme</Label>
      <Select onValueChange={(value) => handleChangeTheme(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes.map((theme, index) => (
            <SelectItem value={theme} key={index}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 border-2 rounded-sm`}
                  data-theme={theme}
                ></div>
                <div>{theme}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mt-3">
        <Label className="text-lg font-semibold">Styles</Label>
        <div className="mt-4 flex items-center gap-3">
          <Checkbox checked={borderChecked} onCheckedChange={toggleBorder} />
          <div>Border </div>
        </div>
      </div>
      <div className="mt-3">
        <Label className="text-lg font-semibold">
          Enable Social Authentication
        </Label>
        <div className="mt-4 flex items-center gap-3">
          <Checkbox checked={authEnabled} onCheckedChange={toggleAuthEnable} />
          <div>By enabling this each user can only submit a single form </div>
        </div>
      </div>
    </div>
  );
};
