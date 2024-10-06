"use server";
import db from "@/db/index";
export const ChangeBorderStyleDB = async (
  styleBorder: string,
  formId: string,
  email: string
) => {
  await db.form.update({
    where: {
      id: formId,
      createdBy: email,
    },
    data: {
      borderStyle: styleBorder,
    },
  });
};
