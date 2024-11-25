"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Themes } from "@/app/edit-form/_data/Theme";
import { Button } from "@/components/ui/button";
import FormUI from "./FormUI";
import { createUserCustomStyle } from "@/app/actions/CreateCustomStyle";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { getUserCustomStyle } from "@/app/actions/GetUserCustomStyle";

type Props = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

const ConfigureCustomStyles = ({ user }: Props) => {
  const [theme, setTheme] = useState("");
  const [borderChecked, setBorderChecked] = useState(false);
  const [borderStyle, setBorderStyle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSaveCustomStyle = async () => {
    setLoading(true);
    await createUserCustomStyle(user.email, imageUrl, borderStyle, theme);
    fetchUserCustomStyles();
    toast.success("Styles saved successfully");
    setLoading(false);
  };
  const fetchUserCustomStyles = async () => {
    const customStyles = await getUserCustomStyle(user.email);
    if (customStyles) {
      setTheme(customStyles.theme);
      setImageUrl(customStyles.imageUrl as string);
      setBorderStyle(customStyles.borderStyle);
    }
  };
  useEffect(() => {
    fetchUserCustomStyles();
  }, []);
  return (
    <div className="w-full  h-full p-10">
      <div className="flex flex-col md:flex-row gap-2">
        <div>
          <h3 className="text-xl font-bold">Style Your Forms Your Way</h3>
          <p className="text-gray-600 mb-6">
            Customize the appearance of your forms to align with your
            company&apos;s or yours branding and preferences.
          </p>
          <div className="grid md:grid-cols-1 gap-5 h-full w-full">
            <div className="w-full">
              <Label className="flex gap-4 flex-col">
                <div className="text-lg font-bold">
                  {" "}
                  Upload background Image for your forms
                </div>
                <Input type={"file"} />
              </Label>
              <div className="mt-5">
                <Label className="font-semibold text-lg">Select Theme</Label>
                <Select onValueChange={(value) => setTheme(value)}>
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
                    <Checkbox
                      checked={borderChecked}
                      onCheckedChange={() => {
                        setBorderChecked((prev) => !prev);
                        setBorderStyle((prev) =>
                          prev ? "" : "border-2 border-primary"
                        );
                      }}
                    />
                    <div>Border </div>
                  </div>
                </div>
              </div>
              <Button
                disabled={loading}
                className="mt-5 disabled:opacity-50"
                onClick={handleSaveCustomStyle}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    Saving <Loader2 className="w-3 h-3 animate-spin" />
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="border">
          <FormUI borderStyle={borderStyle} selectedTheme={theme} />
        </div>
      </div>
    </div>
  );
};

export default ConfigureCustomStyles;
