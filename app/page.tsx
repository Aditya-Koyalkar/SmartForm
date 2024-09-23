"use client";
import Hero from "./_components/Hero";
import { useSession } from "next-auth/react";

export default function Home() {
  const user = useSession();

  return (
    <div>
      <Hero />
    </div>
  );
}
