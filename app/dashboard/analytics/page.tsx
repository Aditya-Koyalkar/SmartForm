import { getAnalyticsData } from "@/app/actions/getuserAnalytics";
import Chart from "./chart";
import { GetCurrentUser } from "@/app/actions/GetCurrentUser";

export default async function Component() {
  const dbUser = await GetCurrentUser();
  const data = await getAnalyticsData(dbUser?.email as string);

  return (
    <div className="flex justify-center  h-full mt-20">
      <Chart data={data} />
    </div>
  );
}
