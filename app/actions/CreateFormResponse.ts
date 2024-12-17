"use server";
import db from "@/db/index";
import moment from "moment";
export const CreateFormResponse = async (jsonUserResponse: string, formId: string, submittedBy: string) => {
  try {
    const response = await db.formResponses.create({
      data: {
        jsonUserResponse: jsonUserResponse,
        formId: formId,
        submittedBy: submittedBy,
        createdAt: moment().format("DD/MM/YYYY"),
        createdDate: new Date(),
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};
