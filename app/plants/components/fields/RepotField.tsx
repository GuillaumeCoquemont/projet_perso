"use client";

type Props = {
  defaultMinYears?: number | null;
  defaultMaxYears?: number | null;
  defaultOther?: string | null;
};

export default function RepotField({ defaultMinYears, defaultMaxYears, defaultOther }: Props) {
  return (
    <div className="space-y-2">
      <label className="block font-medium">Rempotage</label>
      <input
        type="number"
        name="repotMinYears"
        placeholder="Rempotage min (années)"
        className="border p-2 w-full"
        defaultValue={defaultMinYears ?? ""}
      />
      <input
        type="number"
        name="repotMaxYears"
        placeholder="Rempotage max (années)"
        className="border p-2 w-full"
        defaultValue={defaultMaxYears ?? ""}
      />
      <input
        type="text"
        name="repotOther"
        placeholder="Autre rempotage"
        className="border p-2 w-full"
        defaultValue={defaultOther ?? ""}
      />
    </div>
  );
}
