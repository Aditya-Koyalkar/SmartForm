import { GetCurrentUser } from "@/app/actions/GetCurrentUser";
import ConfigureCustomStyles from "./_components/ConfigureCustomStyles";

const Page = async () => {
  const dbUser = await GetCurrentUser();
  if (!dbUser) {
    return <div>un auth</div>;
  }
  return <ConfigureCustomStyles user={dbUser} />;
};

export default Page;
