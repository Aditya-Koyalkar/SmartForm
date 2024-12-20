import { cn } from "@/lib/utils";
import { SquareMenu } from "lucide-react";
import Link from "next/link";

const Logo = ({
  fontSize = "2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-primary to-blue-300 p-2">
        <SquareMenu size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
          Smart
        </span>
        <span className="text-stone-700 dark:text-stone-300 ">Form</span>
      </div>
    </Link>
  );
};

export default Logo;
