"use client";
// import { Progress } from "@/components/ui/progress";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreateForm } from "./CreateForm";
import { useUser } from "@clerk/nextjs";
// // import { Form } from "./FromList";

export const SideNav = () => {
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
    <div className="h-screen shadow-md border">
      <div className="p-4">
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
      </div>
      <div className="fixed bottom-10 p-6 ">
        {user.isSignedIn && (
          <CreateForm
            email={user.user?.primaryEmailAddress?.emailAddress as string}
          />
        )}
      </div>
    </div>
  );
};
