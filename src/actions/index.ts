"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/db";

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  const title = formData.get("title");
  const code = formData.get("code");

  if (typeof title !== "string" || title.length < 3) {
    return { message: "Title must be longer!" };
  }

  if (typeof code !== "string" || code.length < 10) {
    return { message: "Code must be longer!" };
  }

  try {
    await prisma.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: "Something went wrong!" };
  }

  revalidatePath("/");

  redirect("/");
}

export async function editSnippet(id: number, code: string) {
  await prisma.snippet.update({
    where: { id },
    data: { code },
  });

  revalidatePath(`/snippets/${id}`);

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await prisma.snippet.delete({
    where: { id },
  });

  revalidatePath("/");

  redirect("/");
}
