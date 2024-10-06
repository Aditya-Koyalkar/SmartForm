"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const FieldEdit = ({
  defaultValue,
  onUpdate,
  onDelete,
}: {
  defaultValue: {
    fieldName: string;
    placeholder: string;
    label: string;
    fieldType: string;
    required: boolean;
    options: [];
  };
  onUpdate: (label: string, placeholder: string) => void;
  onDelete: () => void;
}) => {
  const [label, setLabel] = useState(defaultValue.label);
  const [placeholder, setPlaceholder] = useState(defaultValue.placeholder);
  return (
    <div className=" flex gap-2 items-center">
      <Popover>
        <PopoverTrigger>
          <Edit className="h-5 w-5 text-gray-600 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="font-semibold mb-2">Edit Fields</div>
          <div className="flex flex-col gap-2">
            <div>
              <Label>Label Name</Label>
              <Input
                type="text"
                defaultValue={defaultValue.label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div>
              <Label>Place Holder</Label>
              <Input
                type="text"
                defaultValue={defaultValue.placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
              />
            </div>
            <Button
              onClick={() => onUpdate(label, placeholder)}
              className="mt-2"
            >
              Update
            </Button>
          </div>
        </PopoverContent>
      </Popover>{" "}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="bg-transparent border-none">
            <Trash className="h-5 w-5 text-red-600 cursor-pointer bg-transparent" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete and
              remove your data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
