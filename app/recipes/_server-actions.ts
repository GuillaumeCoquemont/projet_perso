"use server";

import { prisma } from "../../lib/db";
import { auth } from "../../lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRecipe(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");
  const title = String(formData.get("title") || "").trim();
  const description = (formData.get("description") as string | null) || null;
  const isPublic = formData.get("isPublic") === "on";

  if (!title) {
    throw new Error("Title is required");
  }

  await prisma.recipe.create({
    data: {
      title,
      description,
      isPublic,
      ownerId: session.user.id,
    },
  });

  revalidatePath("/recipes");

  redirect("/recipes");
}