import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Select } from "@radix-ui/react-select";

type Props = {
  selectedTheme: string;
  borderStyle: string;
  imageUrl: string;
};

const FormUI = ({ selectedTheme, borderStyle, imageUrl }: Props) => {
  return (
    <form
      className={`md:w-[600px] rounded-xl p-6 shadow-md ${borderStyle}`}
      data-theme={selectedTheme}
    >
      {imageUrl && <img src={imageUrl} className="w-full max-h-[200px]" />}
      <div className="font-bold text-center text-xl">Title</div>
      <div className="text-sm text-gray-400 text-center">Feedback Form</div>
      <div className="flex flex-col gap-4 mt-3">
        <div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <Label className="font-semibold w-[96%]">label</Label>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={"select me"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="value">Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <Label className="font-semibold w-[96%]">Label</Label>
            </div>
            <RadioGroup defaultValue="option-one">
              <div key={"1"} className="flex items-center space-x-2">
                <RadioGroupItem value="" />
                <Label htmlFor="">option</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <Label className="font-semibold w-[96%]">Input</Label>
          </div>
          <Input />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <Label className="font-semibold w-[96%]">Input</Label>
          </div>
          <Input />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <Label className="font-semibold w-[96%]">Input</Label>
          </div>
          <Input />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <Label className="font-semibold w-[96%]">Input</Label>
          </div>
          <Input />
        </div>
        <div className="flex justify-center my-2 mt-6">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormUI;
