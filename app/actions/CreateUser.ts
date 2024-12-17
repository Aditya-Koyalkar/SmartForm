"use server";

import prisma from "@/db";

export async function CreateUser(userId: string, email: string, name: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        email: email,
      },
    });
    if (user) {
      return true;
    }
    const newUser = await prisma.user.create({
      data: {
        id: userId,
        email: email,
        name,
      },
    });

    return newUser;
  } catch (e) {
    console.log(e);
    throw new Error("some thing went wrong while creating user");
  }
}
