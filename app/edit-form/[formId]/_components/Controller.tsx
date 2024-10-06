import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Themes } from "../../_data/Theme";
import { Label } from "@/components/ui/label";

export const Controller = ({
  handleChangeTheme,
}: {
  handleChangeTheme: (value: string) => void;
}) => {
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
    </div>
  );
};
