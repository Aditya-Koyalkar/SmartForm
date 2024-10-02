"use client";
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
import { useState } from "react";

export const CreateForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const onCreateForm = () => {
    console.log(userInput);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger>
          <Button onClick={() => setOpen(true)}>+ Create new Form</Button>
        </DialogTrigger>
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Create new Form</DialogTitle>
            <DialogDescription>
              <Textarea
                onChange={(e) => setUserInput(e.target.value)}
                className="my-2"
                placeholder="Write the description about the Form you want to create"
              />
              <div className="flex justify-end gap-3 mt-3">
                <Button onClick={() => setOpen(false)} variant={"destructive"}>
                  Cancel
                </Button>
                <Button onClick={onCreateForm}>Create</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
