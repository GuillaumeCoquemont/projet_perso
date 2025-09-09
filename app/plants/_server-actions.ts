

"use server";

import { prisma } from "../../lib/db";
import { auth } from "../../lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPlant(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const name = String(formData.get("name") || "").trim();
  const species = (formData.get("species") as string | null) || null;

  if (!name) {
    throw new Error("Name is required");
  }

  await prisma.plant.create({
    data: {
      name,
      species,
      ownerId: session.user.id,
    },
  });

  revalidatePath("/plants");
  redirect("/plants");
}