"use client";

export default function ClimateField() {
  return (
    <div className="space-y-2">
      <label className="block font-medium">Climat</label>
      <input
        type="number"
        name="tempMinC"
        placeholder="Température min (°C)"
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="tempMaxC"
        placeholder="Température max (°C)"
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="humidityMin"
        placeholder="Humidité min (%)"
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="humidityMax"
        placeholder="Humidité max (%)"
        className="border p-2 w-full"
      />
      <textarea
        name="climateNotes"
        placeholder="Notes sur le climat"
        className="border p-2 w-full"
      />
    </div>
  );
}
