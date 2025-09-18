import { prisma } from "@/lib/db";
import type { PlantInput } from "@/app/plants/_validators";
import { toLightEnum, toWateringEnum } from "@/app/plants/_mappers";

export async function createPlantService(ownerId: string, input: PlantInput) {
  return prisma.plant.create({
    data: {
      ownerId,
      name: input.name,
      species: input.species ?? null,

      light: toLightEnum(input.light) ?? null,
      lightOther: input.lightOther ?? null,

      watering: toWateringEnum(input.watering) ?? null,
      wateringOther: input.wateringOther ?? null,

      tempMinC: input.tempMinC ?? null,
      tempMaxC: input.tempMaxC ?? null,
      humidityMin: input.humidityMin ?? null,
      humidityMax: input.humidityMax ?? null,
      climateNotes: input.climateNotes ?? null,

      repotMinYears: input.repotMinYears ?? null,
      repotMaxYears: input.repotMaxYears ?? null,
      repotOther: input.repotOther ?? null,

      petSafe: input.petSafe ?? null,
      petNotes: input.petNotes ?? null,

      imageUrl: input.imageUrl ?? null,
      notes: input.notes ?? null,
    },
  });
}