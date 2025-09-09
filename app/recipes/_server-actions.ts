"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Minimal server action usable directly as a <form action={createRecipe}>
export async function createRecipe(formData: FormData) {
  // Read values coming from the form
  const title = String(formData.get("title") || "").trim();
  const description = (formData.get("description") as string | null) || null;
  const isPublic = formData.get("isPublic") === "on";

  if (!title) {
    throw new Error("Title is required");
  }

  // Persist in DB (aligns with your Prisma schema: ingredients/steps/tags are optional JSON)
  const recipe = await prisma.recipe.create({
    data: {
      title,
      description,
      isPublic,
      ownerId: (await import("@/lib/auth")).auth().then((s) => s?.user.id ?? ""),
    },
  });

  // Refresh the recipes list
  revalidatePath("/recipes");

  // Redirect to list (or to the detail page if you add it later)
  redirect("/recipes");

  return recipe;
}