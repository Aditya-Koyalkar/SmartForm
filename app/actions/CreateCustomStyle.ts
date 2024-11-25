"use server";

import prisma from "@/db";

export const createUserCustomStyle = async (
  email: string,
  imageUrl: string,
  borderStyle: string,
  theme: string
) => {
  try {
    const customStyles = await prisma.customStyles.upsert({
      where: {
        createdBy: email,
      },
      create: {
        createdBy: email,
        imageUrl,
        borderStyle,
        theme,
      },
      update: {
        imageUrl,
        borderStyle,
        theme,
      },
    });
    return customStyles;
  } catch (e) {
    console.log(e);
  }
};
