"use client";

import { WATERING_LABELS } from "../../labels";
import { WATERING_OPTIONS } from "../../_validators";

export default function WateringField() {
  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-sm">Arrosage *</span>
        <select
          name="watering"
          className="border rounded px-3 py-2 w-full mb-2"
        >
          <option value="">-- Choisir --</option>
          {WATERING_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {WATERING_LABELS[o]}
            </option>
          ))}
        </select>
      </label>
      <input
        type="text"
        name="wateringOther"
        className="border rounded px-3 py-2 w-full"
        placeholder="Autre arrosage"
      />
    </div>
  );
}
