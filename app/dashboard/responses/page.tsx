import { GetAllUserForms } from "@/app/actions/GetAllUserForm";
import { FormListItemResponse } from "./_components/FormListItemResponse";
import { GetCurrentUser } from "@/app/actions/GetCurrentUser";

export default async function Responses() {
  const dbUser = await GetCurrentUser();
  const formList = await GetAllUserForms(dbUser?.email as string);
  return (
    <div className="p-10">
      <div className="font-bold text-3xl flex items-center justify-between">
        <div>Responses</div>
      </div>
      {formList &&
        (formList.length == 0 ? (
          <div className="text-center mt-20">
            You don&apos;t have any forms currently.
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
            {formList.map((form, index) => (
              <FormListItemResponse
                form={form}
                key={index}
                email={dbUser?.email as string}
              />
            ))}
          </div>
        ))}
    </div>
  );
}
