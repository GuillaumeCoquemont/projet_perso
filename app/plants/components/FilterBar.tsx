"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LIGHT_OPTIONS, WATERING_OPTIONS } from "../_validators";
import { LIGHT_LABELS, WATERING_LABELS } from "../labels";

export default function FilterBar() {
  const sp = useSearchParams();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [q, setQ] = useState(sp.get("q") ?? "");
  const [light, setLight] = useState(sp.get("light") ?? "");
  const [watering, setWatering] = useState(sp.get("watering") ?? "");
  const [petSafe, setPetSafe] = useState(sp.get("petSafe") ?? "");

  useEffect(() => {
    setQ(sp.get("q") ?? "");
    setLight(sp.get("light") ?? "");
    setWatering(sp.get("watering") ?? "");
    setPetSafe(sp.get("petSafe") ?? "");
  }, [sp]);

  const autoSubmit = () => {
    window.setTimeout(() => formRef.current?.requestSubmit(), 0);
  };

  return (
    <form ref={formRef} method="get" className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <input
        name="q"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
        }}
        placeholder="Recherche nom/espèce…"
        className="border rounded px-3 py-2"
      />

      <select
        name="light"
        value={light}
        onChange={(e) => {
          setLight(e.target.value);
          autoSubmit();
        }}
        className="border rounded px-3 py-2"
      >
        <option value="">Luminosité — toutes</option>
        {LIGHT_OPTIONS.map((o) => (
          <option key={o} value={o}>
            {LIGHT_LABELS[o]}
          </option>
        ))}
      </select>

      <select
        name="watering"
        value={watering}
        onChange={(e) => {
          setWatering(e.target.value);
          autoSubmit();
        }}
        className="border rounded px-3 py-2"
      >
        <option value="">Arrosage — tous</option>
        {WATERING_OPTIONS.map((o) => (
          <option key={o} value={o}>
            {WATERING_LABELS[o]}
          </option>
        ))}
      </select>

      <select
        name="petSafe"
        value={petSafe}
        onChange={(e) => {
          setPetSafe(e.target.value);
          autoSubmit();
        }}
        className="border rounded px-3 py-2"
      >
        <option value="">Animaux — indifférent</option>
        <option value="true">Sans danger</option>
        <option value="false">Toxique</option>
      </select>

      <div className="md:col-span-4 flex gap-2">
        <button type="submit" className="border rounded px-3 py-2">
          Filtrer
        </button>
        <a href="/plants" className="border rounded px-3 py-2">
          Réinitialiser
        </a>
      </div>
    </form>
  );
}