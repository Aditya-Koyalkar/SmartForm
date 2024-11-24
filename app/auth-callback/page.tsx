"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { CreateUser } from "../actions/CreateUser";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
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
const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      }
    >
      <AuthCallback />
    </Suspense>
  );
};

export default Page;
