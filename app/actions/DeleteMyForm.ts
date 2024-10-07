"use server";
import db from "@/db/index";
export const DeleteMyForm = async (formId: string, email: string) => {
  try {
    const response = await db.form.delete({
      where: {
        id: formId,
        createdBy: email,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};
