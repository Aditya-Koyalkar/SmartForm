import { GetCurrentUser } from "@/app/actions/GetCurrentUser";
import { GetFormResponses } from "@/app/actions/GetFormResponses";
import { GetMyForm } from "@/app/actions/GetMyForm";
import { auth } from "@clerk/nextjs/server";
import { ImSad } from "react-icons/im";
import FormResponses from "./_components/FormResponses";

export default async function FormResponse({
  params,
}: {
  params: { id: string };
}) {
  const formId = params.id;
  const { userId } = await auth();
  if (!userId) {
    return <div>not auth</div>;
  }
  const user = await GetCurrentUser();
  if (!user) {
    return <div>not auth</div>;
  }
  const formResponses = await GetFormResponses(formId, user?.email);
  const form = await GetMyForm(formId);
  if (!formResponses || !form) {
    return;
  }
  if (formResponses.length == 0) {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="flex mt-32 gap-3 items-center text-primary text-xl">
          No responses yet <ImSad className="w-8 h-8" />
        </div>
      </div>
    );
  }
  const responses = formResponses.map((res) =>
    JSON.parse(res.jsonUserResponse)
  );
  return (
    <div>
      <FormResponses responses={responses} form={form} />
    </div>
  );
}
