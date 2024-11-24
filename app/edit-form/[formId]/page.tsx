import { auth } from "@clerk/nextjs/server";
import EditForm from "./_components/EditForm";
import { GetCurrentUser } from "@/app/actions/GetCurrentUser";

export default async function EditFormPage({
  params,
}: {
  params: { formId: string };
}) {
  const formId = params.formId;
  const user = await auth();
  if (!user || !user.userId) {
    return <div>un auth</div>;
  }
  const currentUser = await GetCurrentUser();
  return <EditForm email={currentUser?.email as string} formId={formId} />;
}
