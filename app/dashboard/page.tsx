import { CreateForm } from "./_components/CreateForm";
import { FormList } from "./_components/FromList";
import { auth } from "@clerk/nextjs/server";
import { GetCurrentUser } from "../actions/GetCurrentUser";

export default async function Dashboard() {
  const user = await auth();
  if (!user || !user.userId) {
    return <div>unauth</div>;
  }
  const dbUser = await GetCurrentUser();
  if (!dbUser) {
    return <div>un auth</div>;
  }
  return (
    <div className="p-10">
      <div className="font-bold text-2xl md:text-3xl flex items-center justify-between">
        <div>DashBoard</div>
        <CreateForm email={dbUser.email} />
      </div>
      <div>
        <FormList email={dbUser.email} />
      </div>
    </div>
  );
}
