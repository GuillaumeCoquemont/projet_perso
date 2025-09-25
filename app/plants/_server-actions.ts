"use server";

import { ZodError } from "zod";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { plantInputSchema } from "./_validators";
import { createPlantService } from "@/lib/services/plants";
import { prisma } from "@/lib/db";

export type CreatePlantState = { ok: boolean; error?: string; fieldErrors?: Record<string, string[]> };

export async function createPlant(
  _prev: CreatePlantState,
  formData: FormData
): Promise<CreatePlantState> {
  const session = await auth();
  if (!session) return { ok: false, error: "Login requis" };

  try {
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
  } catch (e: any) {
    if (e instanceof ZodError) {
      return { ok: false, fieldErrors: e.flatten().fieldErrors as Record<string, string[]> };
    }
    const msg = e?.message ?? "Création impossible";
    return { ok: false, error: msg };
  }

  // Succès => invalider et rediriger
  console.log("createPlant ok, redirecting…");
  revalidatePath("/plants");
  redirect("/plants");
}

export type DeletePlantState = { ok: boolean; error?: string };

export async function deletePlant(
  _prev: DeletePlantState,
  formData: FormData
): Promise<DeletePlantState> {
  const session = await auth();
  if (!session) return { ok: false, error: "Login requis" };

  const id = formData.get("id");
  if (!id || typeof id !== "string") {
    return { ok: false, error: "ID invalide" };
  }

  const isAdmin = String(session.user.role || "").toUpperCase() === "ADMIN";

  try {
    if (isAdmin) {
      await prisma.plant.delete({ where: { id } });
    } else {
      const res = await prisma.plant.deleteMany({
        where: { id, ownerId: session.user.id },
      });
      if (res.count === 0) {
        return { ok: false, error: "Introuvable ou non autorisé." };
      }
    }
  } catch (e: any) {
    return { ok: false, error: "Suppression impossible" };
  }

  revalidatePath("/plants");
  revalidatePath(`/plants/${id}`);
  redirect("/plants");
}

export type UpdatePlantState = { ok: boolean; error?: string; fieldErrors?: Record<string, string[]> };

export async function updatePlant(
  _prev: UpdatePlantState,
  formData: FormData
): Promise<UpdatePlantState> {
  const session = await auth();
  if (!session) return { ok: false, error: "Login requis" };

  const id = formData.get("id");
  if (!id || typeof id !== "string") {
    return { ok: false, error: "ID invalide" };
  }

  // Normalise l'entrée via le même schéma que la création
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

  const isAdmin = String(session.user.role || "").toUpperCase() === "ADMIN";

  try {
    if (isAdmin) {
      await prisma.plant.update({
        where: { id },
        data: input,
      });
    } else {
      const res = await prisma.plant.updateMany({
        where: { id, ownerId: session.user.id },
        data: input,
      });
      if (res.count === 0) {
        return { ok: false, error: "Introuvable ou non autorisé." };
      }
    }
  } catch (e: any) {
    if (e instanceof ZodError) {
      return { ok: false, fieldErrors: e.flatten().fieldErrors as Record<string, string[]> };
      }
    return { ok: false, error: "Mise à jour impossible" };
  }

  revalidatePath("/plants");
  revalidatePath(`/plants/${id}`);
  redirect(`/plants/${id}`);
}
