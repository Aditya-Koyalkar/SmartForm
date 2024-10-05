"use server";
import db from "@/db/index";
export const GetMyForm = async (formId: string) => {
  try {
    const form = await db.form.findFirst({
      where: {
        id: formId,
      },
    });
    return form;
  } catch (e) {
    console.log(e);
  }
};
