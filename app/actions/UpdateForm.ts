"use server";
import db from "@/db/index";

export const UpdateFormDB = async (json: string, id: string, email: string) => {
  try {
    const response = await db.form.update({
      where: {
        id,
        createdBy: email,
      },
      data: {
        jsonform: json,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};
