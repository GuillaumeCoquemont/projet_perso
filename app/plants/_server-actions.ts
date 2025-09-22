// app/plants/_server-actions.ts
"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { plantInputSchema } from "./_validators";
import { createPlantService } from "@/lib/services/plants";
import { Prisma } from "@prisma/client";

/**
 * Création (reste protégée: quand auth sera prête)
 */
export async function createPlant(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const input = plantInputSchema.parse({
    name: formData.get("name"),
    species: formData.get("species"),
    light: formData.get("light"),
    lightOther: formData.get("lightOther"),
    watering: formData.get("watering"),
    wateringOther: formData.get("wateringOther"),
    tempMinC: formData.get("tempMinC"),
    tempMaxC: formData.get("tempMaxC"),
    humidityMin: formData.get("humidityMin"),
    humidityMax: formData.get("humidityMax"),
    climateNotes: formData.get("climateNotes"),
    repotMinYears: formData.get("repotMinYears"),
    repotMaxYears: formData.get("repotMaxYears"),
    repotOther: formData.get("repotOther"),
    petSafe: formData.get("petSafe") ? true : null,
    petNotes: formData.get("petNotes"),
    imageUrl: formData.get("imageUrl"),
    notes: formData.get("notes"),
  });

  await createPlantService(session.user.id, input);
  revalidatePath("/plants");
  redirect("/plants");
}

export type DeletePlantState = { ok: boolean; error?: string };

/**
 * Suppression:
 * - Dev sans auth: si AUTH_OPTIONAL=true et pas de session → autorise (dangereux mais pratique en local).
 * - Avec session: admin = tout; user = seulement ses plantes.
 */
export async function deletePlant(
  
  _prev: DeletePlantState,
  formData: FormData
): Promise<DeletePlantState> {
  const AUTH_OPTIONAL = process.env.AUTH_OPTIONAL === "true";

  // Essaye d’obtenir la session; si auth pas encore branchée, on tolère l’échec.
  let session: Awaited<ReturnType<typeof auth>> | null = null;
  try {
    session = await auth();
  } catch {
    session = null;
  }

  const id = formData.get("id");
  console.log("AUTH_OPTIONAL:", AUTH_OPTIONAL, "session:", Boolean(session), "id:", id);
  if (!id || typeof id !== "string") {
    return { ok: false, error: "ID invalide" };
  }

  // Pas d’auth : seulement si flag dev activé
  if (!session && !AUTH_OPTIONAL) {
    return { ok: false, error: "Login requis" };
  }

  const isAdmin =
    session && String(session.user.role || "").toLowerCase() === "admin";

  try {
    if (!session && AUTH_OPTIONAL) {
      // Mode dev sans auth: suppression directe
      await prisma.plant.delete({ where: { id } });
    } else if (isAdmin) {
      await prisma.plant.delete({ where: { id } });
    } else if (session) {
      // Défense en profondeur: n’efface que si owner
      const res = await prisma.plant.deleteMany({
        where: { id, ownerId: session.user.id },
      });
      if (res.count === 0) {
        return { ok: false, error: "Introuvable ou non autorisé." };
      }
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2003") {
        return { ok: false, error: "Suppression impossible: éléments liés." };
      }
    }
    return { ok: false, error: "Suppression impossible" };
  }

  revalidatePath("/plants");
  revalidatePath(`/plants/${id}`);
  redirect("/plants");
}