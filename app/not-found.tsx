import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="h-screen w-full flex  justify-center">
      <div className="mt-20 flex gap-5 h-fit items-center">
        <div className=" text-xl font-bold ">Page Not Found</div>
        <Link
          href={"/dashboard"}
          className="flex items-center justify-center px-4 py-2 text-white rounded-md bg-primary hover:bg-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard{" "}
        </Link>
      </div>
    </div>
  );
};

export default Page;
