"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "../_components/Spinner";

export default function Dashboard() {
  const { data: session, status } = useSession();
  if (status == "loading") {
    return <Spinner />;
  }
  if (status == "unauthenticated") {
    signIn();
  }

  return <div>Dashboard</div>;
}
