"use server";

import prisma from "@/db";

export const getUserCustomStyle = async (email: string) => {
  const customStyles = await prisma.customStyles.findFirst({
    where: {
      createdBy: email,
    },
  });
  if (!customStyles) {
    return null;
  }
  return customStyles;
};
