"use server";
import db from "@/db/index";
export const GetAllUserForms = async (email: string) => {
  try {
    const forms = await db.form.findMany({
      where: {
        createdBy: email,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return forms;
  } catch (e) {
    console.log(e);
  }
};
