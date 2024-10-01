"use client";
import { Button } from "@/components/ui/button";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const SideNav = () => {
  const path = usePathname();
  useEffect(() => {}, [path]);

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
          <div
            key={index}
            className={`flex items-center  gap-5 mb-5 hover:bg-primary cursor-pointer hover:text-white rounded-lg p-3 transition-all border ${
              path === menu.path && "bg-primary text-white"
            }`}
          >
            <menu.icon />
            {menu.name}
          </div>
        ))}
      </div>
      <div className="fixed bottom-20 p-6">
        <Button>+ Create Form</Button>
      </div>
    </div>
  );
};
