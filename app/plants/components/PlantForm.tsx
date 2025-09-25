"use client";

import { useActionState } from "react";
import LightField from "./fields/LightField";
import WateringField from "./fields/WateringField";
import ClimateField from "./fields/ClimateField";
import RepotField from "./fields/RepotField";
import PetField from "./fields/PetField";
import NameField from "./fields/NameField";
import { createPlant } from "../_server-actions";

// Server action signature expected by useActionState
type ServerAction = (prevState: any, formData: FormData) => Promise<any> | any;

type PlantFormProps = {
  action?: ServerAction;
  initialValues?: any;
  submitLabel?: string;
};

export default function PlantForm({
  action = createPlant,
  initialValues,
  submitLabel = "Enregistrer",
}: PlantFormProps) {
  const [state, formAction, isPending] = useActionState(action, { ok: false });
  const fe = (state?.fieldErrors ?? {}) as Record<string, string[]>;

  return (
    <form action={formAction} className="space-y-4 max-w-xl">
      <h2 className="text-lg font-medium">Formulaire plante</h2>

      {initialValues?.id && (
        <input type="hidden" name="id" defaultValue={initialValues.id} />
      )}

      {/* Name */}
      <NameField defaultValue={initialValues?.name} />
      {fe.name?.[0] && <p className="text-sm text-red-600">{fe.name[0]}</p>}

      {/* Species */}
      <div className="space-y-1">
        <label htmlFor="species" className="block text-sm font-medium">Espèce</label>
        <input
          id="species"
          name="species"
          type="text"
          className="w-full rounded border px-3 py-2"
          defaultValue={initialValues?.species ?? ""}
        />
        {fe.species?.[0] && <p className="text-sm text-red-600">{fe.species[0]}</p>}
      </div>

      {/* Light (with other) */}
      <LightField
        defaultValue={initialValues?.light}
        defaultOther={initialValues?.lightOther}
      />
      {fe.light?.[0] && <p className="text-sm text-red-600">{fe.light[0]}</p>}
      {fe.lightOther?.[0] && <p className="text-sm text-red-600">{fe.lightOther[0]}</p>}

      {/* Watering (with other) */}
      <WateringField
        defaultValue={initialValues?.watering}
        defaultOther={initialValues?.wateringOther}
      />
      {fe.watering?.[0] && <p className="text-sm text-red-600">{fe.watering[0]}</p>}
      {fe.wateringOther?.[0] && <p className="text-sm text-red-600">{fe.wateringOther[0]}</p>}

      {/* Climate */}
      <ClimateField
        defaultTempMin={initialValues?.tempMinC}
        defaultTempMax={initialValues?.tempMaxC}
        defaultHumidityMin={initialValues?.humidityMin}
        defaultHumidityMax={initialValues?.humidityMax}
        defaultClimateNotes={initialValues?.climateNotes}
      />
      {fe.tempMinC?.[0] && <p className="text-sm text-red-600">{fe.tempMinC[0]}</p>}
      {fe.tempMaxC?.[0] && <p className="text-sm text-red-600">{fe.tempMaxC[0]}</p>}
      {fe.humidityMin?.[0] && <p className="text-sm text-red-600">{fe.humidityMin[0]}</p>}
      {fe.humidityMax?.[0] && <p className="text-sm text-red-600">{fe.humidityMax[0]}</p>}
      {fe.climateNotes?.[0] && <p className="text-sm text-red-600">{fe.climateNotes[0]}</p>}

      {/* Repot */}
      <RepotField
        defaultMinYears={initialValues?.repotMinYears}
        defaultMaxYears={initialValues?.repotMaxYears}
        defaultOther={initialValues?.repotOther}
      />
      {fe.repotMinYears?.[0] && <p className="text-sm text-red-600">{fe.repotMinYears[0]}</p>}
      {fe.repotMaxYears?.[0] && <p className="text-sm text-red-600">{fe.repotMaxYears[0]}</p>}
      {fe.repotOther?.[0] && <p className="text-sm text-red-600">{fe.repotOther[0]}</p>}

      {/* Pets */}
      <PetField
        defaultPetSafe={initialValues?.petSafe}
        defaultPetNotes={initialValues?.petNotes}
      />
      {fe.petSafe?.[0] && <p className="text-sm text-red-600">{fe.petSafe[0]}</p>}
      {fe.petNotes?.[0] && <p className="text-sm text-red-600">{fe.petNotes[0]}</p>}

      {/* Image URL (optional) */}
      <div className="space-y-1">
        <label htmlFor="imageUrl" className="block text-sm text-gray-600">URL image</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          className="w-full rounded border px-3 py-2"
          defaultValue={initialValues?.imageUrl ?? ""}
        />
        {fe.imageUrl?.[0] && <p className="text-sm text-red-600">{fe.imageUrl[0]}</p>}
      </div>

      {/* Notes */}
      <div className="space-y-1">
        <label htmlFor="notes" className="block text-sm text-gray-600">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="w-full rounded border px-3 py-2"
          defaultValue={initialValues?.notes ?? ""}
        />
        {fe.notes?.[0] && <p className="text-sm text-red-600">{fe.notes[0]}</p>}
      </div>

      <button type="submit" className="border rounded px-3 py-2" disabled={isPending}>
        {isPending ? "Envoi..." : submitLabel}
      </button>
      {state?.error && !state?.fieldErrors && (
        <p className="mt-1 text-sm text-red-600" role="alert">{state.error}</p>
      )}
    </form>
  );
}
