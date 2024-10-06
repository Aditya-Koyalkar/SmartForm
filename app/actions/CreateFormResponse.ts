"use server";
import db from "@/db/index";
import moment from "moment";
export const CreateFormResponse = async (
  jsonUserResponse: string,
  formId: string
) => {
  try {
    const response = await db.formResponses.create({
      data: {
        jsonUserResponse: jsonUserResponse,
        formId: formId,
        createdAt: moment().format("DD/MM/YYYY"),
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};
