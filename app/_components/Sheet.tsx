"use client";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { LibraryBig, LineChart, Menu, MessageSquare, Shield, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreateForm } from "../dashboard/_components/CreateForm";

const SheetMenu = () => {
  const path = usePathname();
  const user = useUser();
  // const [formList, setFormList] = useState<Form[]>([]);
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: LineChart,
      path: "/dashboard/analytics",
    },
    {
      id: 1,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetDescription>
            <div className="w-full flex flex-col mt-8 justify-center gap-y-5">
              <Link
                href={"/dashboard/custom-styles"}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "flex gap-2 items-center border-2 border-primary"
                )}
              >
                Custom Form Styling <Star className="w-3 h-3" />{" "}
              </Link>
              <Link href={"/dashboard"} className={buttonVariants()}>
                Dashboard
              </Link>
              {menuList.map((menu, index) => (
                <Link
                  href={`${menu.path}`}
                  key={index}
                  className={`flex items-center  gap-5 mb-5 hover:bg-primary cursor-pointer hover:text-white rounded-lg p-3 transition-all border ${
                    path === menu.path && "bg-primary text-white"
                  }`}
                >
                  <menu.icon />
                  {menu.name}
                </Link>
              ))}
              <div className="fixed bottom-10 p-6 ">
                {user.isSignedIn && <CreateForm email={user.user?.primaryEmailAddress?.emailAddress as string} />}
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
