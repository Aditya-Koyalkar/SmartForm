"use server";
import db from "@/db/index";
export const GetFormResponses = async (formId: string, email: string) => {
  try {
    const responses = await db.formResponses.findMany({
      where: {
        formId: formId,
        Form: {
          createdBy: email,
        },
      },
    });
    return responses;
  } catch (e) {
    console.log(e);
  }
};
