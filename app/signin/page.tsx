"use client";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { Spinner } from "../_components/Spinner";

export default function SignInPage() {
  const { data: session, status } = useSession();

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
    toast({ description: "Signup Successful!" });
  };
  if (status == "authenticated") {
    toast({ description: "U are already logged in" });
    redirect("/dashboard");
  }
  if (status == "loading") {
    return <Spinner />;
  }
  return (
    <div className="flex  justify-center  bg-gray-100 h-screen">
      <div className="w-full mt-[100px] max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md h-[250px]">
        <h2 className="text-3xl font-bold text-center text-[#A120DE]">
          Sign In with SmartForm AI
        </h2>

        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <span className="h-px bg-gray-300 w-16"></span>
          <span> sign in with google to get started</span>
          <span className="h-px bg-gray-300 w-16"></span>
        </div>
        <div className="flex justify-center">
          <Button onClick={handleGoogleSignIn}>
            <IconBrandGoogle />
            <span className="ml-3">Sign in with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
