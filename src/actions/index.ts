"use server";

import { prisma } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
  await prisma.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await prisma.snippet.delete({
    where: { id },
  });

  redirect("/");
}
