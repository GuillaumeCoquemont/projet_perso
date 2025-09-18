"use client";

export default function RepotField() {
  return (
    <div className="space-y-2">
      <label className="block font-medium">Rempotage</label>
      <input
        type="number"
        name="repotMinYears"
        placeholder="Rempotage min (années)"
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="repotMaxYears"
        placeholder="Rempotage max (années)"
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="repotOther"
        placeholder="Autre rempotage"
        className="border p-2 w-full"
      />
    </div>
  );
}
