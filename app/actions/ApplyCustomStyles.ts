"use server";

import prisma from "@/db";

export const ApplyCustomStyling = async (
  fromId: string,
  email: string,
  theme: string,
  imageUrl: string,
  border: string
) => {
  try {
    await prisma.form.update({
      where: {
        id: fromId,
        createdBy: email,
      },
      data: {
        imageUrl,
        borderStyle: border,
        theme,
      },
    });
    return true;
  } catch (e) {
    console.log(e);
  }
};
