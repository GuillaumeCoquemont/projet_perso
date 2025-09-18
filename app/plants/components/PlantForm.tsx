import LightField from "./fields/LightField";
import WateringField from "./fields/WateringField";
import ClimateField from "./fields/ClimateField";
import RepotField from "./fields/RepotField";
import PetField from "./fields/PetField";
import NameField from "./fields/NameField";
import { createPlant } from "../_server-actions";

export default function PlantForm() {
  return (
    <form action={createPlant} className="space-y-4 max-w-xl">
      <NameField />
      <LightField />
      <WateringField />
      <ClimateField />
      <RepotField />
      <PetField />
      <button type="submit" className="border rounded px-3 py-2">
        Créer
      </button>
    </form>
  );
}
