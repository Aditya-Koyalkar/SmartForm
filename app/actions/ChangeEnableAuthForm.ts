"use server";
import db from "@/db/index";
export const ChangeEnableAuthForm = async (
  value: boolean,
  formId: string,
  email: string
) => {
  await db.form.update({
    where: {
      id: formId,
      createdBy: email,
    },
    data: {
      enableAuth: value,
    },
  });
};
