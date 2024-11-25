import { GetCurrentUser } from "@/app/actions/GetCurrentUser";
import { auth } from "@clerk/nextjs/server";
import ConfigureCustomStyles from "./_components/ConfigureCustomStyles";

const Page = async () => {
  const dbUser = await GetCurrentUser();
  if (!dbUser) {
    return <div>un auth</div>;
  }
  return <ConfigureCustomStyles user={dbUser} />;
};

export default Page;
