"use client";

import React, { useMemo, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type PlantOption = { id: string; name: string | null };

type Props = {
  options: PlantOption[];
  max?: number; // défaut = 4
};

const AddIdForm: React.FC<Props> = ({ options = [], max = 4 }) => {
  const router = useRouter();
  const sp = useSearchParams();
  const [value, setValue] = useState("");

  const currentIds = useMemo(() => {
    const raw = (sp.get("ids") ?? "").trim();
    return raw ? raw.split(",").map((s) => s.trim()).filter(Boolean) : [];
  }, [sp]);

  const byName = useMemo(() => {
    const map = new Map<string, string>();
    for (const opt of options ?? []) {
      const key = opt?.name?.toLowerCase();
      if (key) map.set(key, opt.id);
    }
    return map;
  }, [options]);

  const remaining = Math.max(0, max - currentIds.length);
  const disabled = remaining === 0;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    const input = value.trim();
    if (!input) return;

    const idFromName = byName.get(input.toLowerCase());
    const candidateId = idFromName ?? input; // fallback : traite la saisie comme un ID

    if (currentIds.includes(candidateId)) return;

    const next = [...currentIds, candidateId].slice(0, max);
    const qs = new URLSearchParams();
    qs.set("ids", next.join(","));
    router.push(`/plants/print/sheet?${qs.toString()}`);
    setValue("");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap items-center gap-2">
      <input
        type="text"
        placeholder={disabled ? "Limite atteinte" : "Ajouter (nom ou ID)"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded border px-3 py-1.5 text-sm"
        list="plant-options"
        disabled={disabled}
      />
      <datalist id="plant-options">
        {(options ?? []).map((o) => (
          <option key={o.id} value={o.name ?? ""} />
        ))}
      </datalist>
      <button
        type="submit"
        disabled={disabled || value.trim().length === 0}
        className={`rounded border px-3 py-1.5 text-sm hover:bg-gray-50 ${
          disabled || value.trim().length === 0
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        Ajouter
      </button>
      <span className="text-xs text-gray-500">{remaining} place(s) restante(s)</span>
    </form>
  );
};

export default AddIdForm;