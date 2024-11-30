import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { MdAdd } from "react-icons/md";

export const AddField = ({
  onFieldAdd,
}: {
  onFieldAdd: (label: string, placeholder: string) => void;
}) => {
  const [placeholder, setPlaceHolder] = useState("");
  const [label, setLabel] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleAddField = () => {
    onFieldAdd(label, placeholder);
    setPlaceHolder("");
    setLabel("");
    setIsPopoverOpen(false);
  };
  return (
    <div className=" flex gap-2 items-center">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger
          onClick={() => setIsPopoverOpen(true)}
          className="flex gap-3 mt-5 items-center"
        >
          <MdAdd /> Add field
        </PopoverTrigger>
        <PopoverContent>
          <div className="font-semibold mb-2">Edit Fields</div>
          <div className="flex flex-col gap-2">
            <div>
              <Label>Label Name</Label>
              <Input type="text" onChange={(e) => setLabel(e.target.value)} />
            </div>
            <div>
              <Label>Place Holder</Label>
              <Input
                type="text"
                onChange={(e) => setPlaceHolder(e.target.value)}
              />
            </div>
            <Button className="mt-2" onClick={handleAddField}>
              Add
            </Button>
          </div>
        </PopoverContent>
      </Popover>{" "}
    </div>
  );
};
