"use client";

import { signIn, useSession } from "next-auth/react";
import { Spinner } from "../_components/Spinner";
import { CreateForm } from "./_components/CreateForm";
import { FormList } from "./_components/FromList";

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

      <div>
        <FormList />
      </div>
    </div>
  );
}
