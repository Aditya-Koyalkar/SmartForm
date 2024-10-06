"use server";
import db from "@/db/index";
export const ChangeThemeDB = async (
  theme: string,
  formId: string,
  email: string
) => {
  await db.form.update({
    where: {
      id: formId,
      createdBy: email,
    },
    data: {
      theme: theme,
    },
  });
};
