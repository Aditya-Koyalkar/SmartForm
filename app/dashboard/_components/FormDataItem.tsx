import { Button } from "@/components/ui/button";
import { Form } from "./FromList";
import { Edit, Share2, Trash } from "lucide-react";
import Link from "next/link";
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
import { DeleteMyForm } from "@/app/actions/DeleteMyForm";
import { toast } from "sonner";
import { RWebShare } from "react-web-share";

export const FormDataItem = ({
  form,
  email,
  fetchUserForms,
}: {
  form: Form;
  email: string;
  fetchUserForms: () => void;
}) => {
  const jsonForm = JSON.parse(form.jsonform);

  const handleDeleteForm = async () => {
    const response = await DeleteMyForm(form.id, email as string);
    toast("Form Deleted Successfully" + response?.id);
    fetchUserForms();
  };
  return (
    <div className="border shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>{form.createdAt}</div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash className="w-5 h-5 text-red-500 cursor-pointer hover:scale-105 transition-all" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                form and its responses from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteForm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <hr className="my-4" />
      <div className=" text-lg">{jsonForm.formTitle}</div>
      <div className="text-sm text-slate-600">{jsonForm.formSubHeading}</div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <RWebShare
          data={{
            text: `${jsonForm.formSubHeading} : Built with SmartFormAI !`,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/live-ai-form/${form.id}`,
            title: `${jsonForm.formTitle}`,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <Button
            variant={"outline"}
            size={"sm"}
            className="flex items-center gap-2"
          >
            <Share2 className="h-5 w-5" />
            Share
          </Button>
        </RWebShare>

        <Link href={`/edit-form/${form.id}`}>
          <Button size={"sm"} className="flex items-center gap-2">
            <Edit className="h-5 w-5" /> Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};
