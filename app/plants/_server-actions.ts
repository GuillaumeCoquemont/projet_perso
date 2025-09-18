"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { plantInputSchema } from "./_validators";
import { createPlantService } from "@/lib/services/plants";

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