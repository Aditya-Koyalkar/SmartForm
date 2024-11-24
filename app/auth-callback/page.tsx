"use client";
import { SignIn, useAuth, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CreateUser } from "../actions/CreateUser";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const page = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const user = useUser();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("url");
  useEffect(() => {
    const createUser = async () => {
      try {
        if (!userId || !user) {
          return;
        }
        await CreateUser(
          userId,
          user.user?.primaryEmailAddress?.emailAddress as string,
          user.user?.fullName as string
        );
        router.push(redirectUrl ? `/${redirectUrl}` : "/dashboard");
      } catch (e) {
        console.log(e);
      }
    };
    createUser();
  }, [userId, user]);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex gap-5">
        <div>Setting up your account. Please wait ...</div>
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    </div>
  );
};

export default page;
