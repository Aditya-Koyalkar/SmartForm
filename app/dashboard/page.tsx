"use client";

import { signIn, useSession } from "next-auth/react";
import { Spinner } from "../_components/Spinner";
import { CreateForm } from "./_components/CreateForm";
import { FormList } from "./_components/FromList";

export default function Dashboard() {
  const { status, data } = useSession();

  if (status == "loading") {
    return <Spinner />;
  }
  if (status == "unauthenticated") {
    return signIn();
  }

  if (status == "authenticated") {
    localStorage.setItem("userInfo", JSON.stringify(data.user));
  }

  return (
    <div className="p-10">
      <div className="font-bold text-2xl md:text-3xl flex items-center justify-between">
        <div>DashBoard</div>
        <CreateForm />
      </div>

      <div>
        <FormList />
      </div>
    </div>
  );
}
