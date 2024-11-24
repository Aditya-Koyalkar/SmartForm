"use server";

import prisma from "@/db";
import { auth } from "@clerk/nextjs/server";

export async function GetCurrentUser() {
  const user = await auth();
  if (!user || !user.userId) {
    throw new Error("unauthorized");
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });
  return dbUser;
}
