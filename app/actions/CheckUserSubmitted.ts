"use server";
import db from "@/db/index";
export const CheckUserSubmitted = async (userEmail: string) => {
  try {
    if (!userEmail) {
      return true;
    }
    const response = await db.formResponses.findFirst({
      where: {
        submittedBy: userEmail,
      },
    });
    if (response) {
      return false;
    }
    return true;
  } catch (e) {
    console.log(e);
  }
};
