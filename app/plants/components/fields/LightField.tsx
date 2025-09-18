"use client";

import { LIGHT_LABELS } from "../../labels";
import { LIGHT_OPTIONS } from "../../_validators";

export default function LigthFields() {
  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-sm">Luminosité *</span>
        <select name="light" className="border rounded px-3 py-2 w-full mb-2">
          <option value="">-- Choisir --</option>
          {LIGHT_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {LIGHT_LABELS[o]}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="lightOther"
          className="border rounded px-3 py-2 w-full"
          placeholder="Autre luminosité"
        />
      </label>
    </div>
  );
}
