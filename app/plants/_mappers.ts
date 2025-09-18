import { LightExposure, WateringSchedule } from "@prisma/client";
import type { PlantInput } from "./_validators";

export function toLightEnum(
  v: PlantInput["light"]
): LightExposure | null | undefined {
  switch (v) {
    case "DIRECT":
      return LightExposure.DIRECT;
    case "INDIRECT":
      return LightExposure.INDIRECT;
    case "LOW":
      return LightExposure.LOW;
    case "SHADE":
      return LightExposure.SHADE;
    case "MIXED":
      return LightExposure.MIXED;
    case "OTHER":
      return LightExposure.OTHER;
    default:
      return null;
  }
}

export function toWateringEnum(
  v: PlantInput["watering"]
): WateringSchedule | null | undefined {
  switch (v) {
    case "DAILY":
      return WateringSchedule.DAILY;
    case "EVERY_2_3_DAYS":
      return WateringSchedule.EVERY_2_3_DAYS;
    case "WEEKLY":
      return WateringSchedule.WEEKLY;
    case "BIWEEKLY":
      return WateringSchedule.BIWEEKLY;
    case "MONTHLY":
      return WateringSchedule.MONTHLY;
    case "SPARSE":
      return WateringSchedule.SPARSE;
    case "WHEN_DRY":
      return WateringSchedule.WHEN_DRY;
    case "OTHER":
      return WateringSchedule.OTHER;
    default:
      return null;
  }
}