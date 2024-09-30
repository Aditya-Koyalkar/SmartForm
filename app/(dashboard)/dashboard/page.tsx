"use client";
import { useSession } from "next-auth/react";
import Hero from "../../_components/Hero";

export default function Dashboard() {
  const user = useSession();
  return (
    <div>
      <Hero />
      <div>{JSON.stringify(user)}</div>
    </div>
  );
}
