"use server";
import prisma from "@/db";
import { subMonths, startOfMonth, endOfMonth } from "date-fns";

export async function getAnalyticsData(email: string) {
  const currentDate = new Date();
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const monthStart = startOfMonth(subMonths(currentDate, i));
    const monthEnd = endOfMonth(subMonths(currentDate, i));
    return { monthStart, monthEnd };
  }).reverse();

  const data = await Promise.all(
    lastSixMonths.map(async ({ monthStart, monthEnd }) => {
      const formsCreated = await prisma.form.count({
        where: {
          createdDate: {
            gte: monthStart,
            lte: monthEnd,
          },
          createdBy: email,
        },
      });

      const responsesReceived = await prisma.formResponses.count({
        where: {
          createdDate: {
            gte: monthStart,
            lte: monthEnd,
          },
          Form: {
            createdBy: email,
          },
        },
      });

      return {
        month: monthStart.toLocaleString("default", { month: "short", year: "numeric" }),
        formsCreated,
        responsesReceived,
      };
    })
  );

  return data;
}
