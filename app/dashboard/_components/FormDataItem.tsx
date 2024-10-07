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
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

export const FormDataItem = ({
  form,
  refetchData,
}: {
  form: Form;
  refetchData: () => void;
}) => {
  const jsonForm = JSON.parse(form.jsonform);
  const user = useSession();
  if (user.status == "loading") {
    return <>Loading</>;
  }
  if (user.status == "unauthenticated") {
    signIn();
  }
  const handleDeleteForm = async () => {
    const response = await DeleteMyForm(
      form.id,
      user.data?.user?.email as string
    );
    toast("Form Deleted Successfully");
    refetchData();
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
        <Button
          variant={"outline"}
          size={"sm"}
          className="flex items-center gap-2"
        >
          <Share2 className="h-5 w-5" /> Share
        </Button>
        <Link href={`/edit-form/${form.id}`}>
          <Button size={"sm"} className="flex items-center gap-2">
            <Edit className="h-5 w-5" /> Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};
