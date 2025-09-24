"use client";

type Props = {
  defaultTempMin?: number | null;
  defaultTempMax?: number | null;
  defaultHumidityMin?: number | null;
  defaultHumidityMax?: number | null;
  defaultClimateNotes?: string | null;
};

export default function ClimateField({
  defaultTempMin,
  defaultTempMax,
  defaultHumidityMin,
  defaultHumidityMax,
  defaultClimateNotes,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="block font-medium">Climat</label>
      <input
        type="number"
        name="tempMinC"
        placeholder="Température min (°C)"
        className="border p-2 w-full"
        defaultValue={defaultTempMin ?? ""}
      />
      <input
        type="number"
        name="tempMaxC"
        placeholder="Température max (°C)"
        className="border p-2 w-full"
        defaultValue={defaultTempMax ?? ""}
      />
      <input
        type="number"
        name="humidityMin"
        placeholder="Humidité min (%)"
        className="border p-2 w-full"
        defaultValue={defaultHumidityMin ?? ""}
      />
      <input
        type="number"
        name="humidityMax"
        placeholder="Humidité max (%)"
        className="border p-2 w-full"
        defaultValue={defaultHumidityMax ?? ""}
      />
      <textarea
        name="climateNotes"
        placeholder="Notes sur le climat"
        className="border p-2 w-full"
        defaultValue={defaultClimateNotes ?? ""}
      />
    </div>
  );
}
