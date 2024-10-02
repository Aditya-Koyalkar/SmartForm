"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "../_components/Spinner";
import { Button } from "@/components/ui/button";
import { CreateForm } from "./_components/CreateForm";

export default function Dashboard() {
  const { data: session, status } = useSession();
  if (status == "loading") {
    return <Spinner />;
  }
  if (status == "unauthenticated") {
    signIn();
  }

  return (
    <div className="p-10">
      <div className="font-bold text-3xl flex items-center justify-between">
        <div>DashBoard</div>
        <CreateForm />
      </div>
    </div>
  );
}
