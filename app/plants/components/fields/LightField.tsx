"use client";

import { LIGHT_LABELS } from "../../labels";
import { LIGHT_OPTIONS } from "../../_validators";

type Props = {
  defaultValue?: string | null;
  defaultOther?: string | null;
};

export default function LightField({ defaultValue, defaultOther }: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor="light" className="block text-sm font-medium">
        Luminosité *
      </label>
      <select
        id="light"
        name="light"
        className="border rounded px-3 py-2 w-full mb-2"
        defaultValue={defaultValue ?? ""}
        required
      >
        <option value="" disabled>
          -- Choisir --
        </option>
        {LIGHT_OPTIONS.map((o) => (
          <option key={o} value={o}>
            {LIGHT_LABELS[o]}
          </option>
        ))}
      </select>

      <label htmlFor="lightOther" className="block text-xs text-gray-600">
        Luminosité (autre)
      </label>
      <input
        id="lightOther"
        type="text"
        name="lightOther"
        className="border rounded px-3 py-2 w-full"
        placeholder="Autre luminosité"
        defaultValue={defaultOther ?? ""}
      />
    </div>
  );
}