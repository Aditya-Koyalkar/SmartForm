"use server";
import db from "@/db/index";
import moment from "moment";

export const CreateFormAction = async (jsonRes: string, email: string) => {
  try {
    const res = await db.form.create({
      data: {
        createdBy: email,
        jsonform: jsonRes,
        createdAt: moment().format("DD/MM/YYYY"),
        createdDate: new Date(),
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};
