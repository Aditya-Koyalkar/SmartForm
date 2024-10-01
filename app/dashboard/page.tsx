"use client";
import { toast } from "@/hooks/use-toast";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    const getSession = async () => {
      const user = await useSession();
      if (!user.data?.user) {
        toast({ description: "Signin to get Started" });
        signIn();
      }
    };
    getSession();
  }, []);
  return <div>Dashboard</div>;
}
