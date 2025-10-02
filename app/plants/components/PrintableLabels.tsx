"use client";

import type { PlantForLabel } from "../types";
import { LIGHT_LABELS, WATERING_LABELS } from "../labels";

type Props = {
  plants: PlantForLabel[];
  templateSrc: string;
};

type Position = { top: string; left: string };
const POS: Array<Partial<{
  title: Position;
  light: Position; light2: Position;
  watering: Position; watering2: Position;
  climate1: Position; climate2: Position;
  repot1: Position; repot2: Position;
  pet: Position;
}>> = [
  // Étiquette 1 (haut-gauche)
  {
    title:   { top: "7%",  left: "28%" },
    light:   { top: "15%", left: "10%" },
    light2:  { top: "18%", left: "10%" },
    watering:{ top: "25%", left: "10%" },
    watering2:{top: "28%", left: "10%" },
    climate1:{ top: "35%", left: "10%" },
    climate2:{ top: "38%", left: "10%" },
    repot1:  { top: "44%", left: "10%" },
    repot2:  { top: "47%", left: "10%" },
    pet:     { top: "44%", left: "44%" },
  },
  // Étiquette 2 (haut-droite)
  {
    title:   { top: "7%",  left: "77%" },
    light:   { top: "15%", left: "60%" },
    light2:  { top: "18%", left: "60%" },
    watering:{ top: "25%", left: "60%" },
    watering2:{top: "28%", left: "60%" },
    climate1:{ top: "35%", left: "60%" },
    climate2:{ top: "38%", left: "60%" },
    repot1:  { top: "44%", left: "60%" },
    repot2:  { top: "47%", left: "60%" },
    pet:     { top: "44%", left: "94%" },
  },
  // Étiquette 3 (bas-gauche)
  {
    title:   { top: "54%", left: "28%" },
    light:   { top: "63%", left: "10%" },
    light2:  { top: "66%", left: "10%" },
    watering:{ top: "73%", left: "10%" },
    watering2:{top: "76%", left: "10%" },
    climate1:{ top: "81%", left: "10%" },
    climate2:{ top: "84%", left: "10%" },
    repot1:  { top: "91%", left: "10%" },
    repot2:  { top: "94%", left: "10%" },
    pet:     { top: "91%", left: "44%" },
  },
  // Étiquette 4 (bas-droite)
  {
    title:   { top: "54%", left: "77%" },
    light:   { top: "63%", left: "60%" },
    light2:  { top: "66%", left: "60%" },
    watering:{ top: "73%", left: "60%" },
    watering2:{top: "76%", left: "60%" },
    climate1:{ top: "81%", left: "60%" },
    climate2:{ top: "84%", left: "60%" },
    repot1:  { top: "91%", left: "60%" },
    repot2:  { top: "94%", left: "60%" },
    pet:     { top: "91%", left: "94%" },
  },
];

export default function PrintableLabels({ plants, templateSrc }: Props) {
  return (
    <div className="print:p-0">
      <div
        className="relative print:w-[297mm] print:h-[210mm] w-[1488px] h-[1052px] bg-white shadow mx-auto"
        style={{ pageBreakAfter: "always" }}
      >
        {/* Image de fond */}
        <img
          src={templateSrc}
          alt="Modèle étiquettes"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {plants.slice(0, 4).map((p, i) => {
          const pos = POS[i] || {};

          const lightLabel = p.light ? (LIGHT_LABELS[p.light as keyof typeof LIGHT_LABELS] ?? p.light) : "—";
          const wateringLabel = p.watering ? (WATERING_LABELS[p.watering as keyof typeof WATERING_LABELS] ?? p.watering) : "—";
          const climateLine = ` ${p.tempMinC ?? "—"}°C - ${p.tempMaxC ?? "—"}°C / Humidité ${p.humidityMin ?? "—"}% - ${p.humidityMax ?? "—"}%`;
          const repotLine = `${p.repotMinYears ?? "—"} - ${p.repotMaxYears ?? "—"} ans`;
          const petSafeText = p.petSafe == null ? "—" : p.petSafe ? "OUI" : "NON";

          return (
            <div key={p.id}>
              {/* Titre */}
              {pos.title && (
                <div
                  className="absolute -translate-y-1/2 text-left text-[18px] font-semibold tracking-wide text-green-700"
                  style={{ top: pos.title.top, left: pos.title.left }}
                >
                  {p.name}
                </div>
              )}

              {/* Lumière */}
              {pos.light && (
                <div className="absolute -translate-y-1/2 text-left text-[22px] leading-[1.6] text-gray-800" style={{ top: pos.light.top, left: pos.light.left }}>
                  {lightLabel}
                </div>
              )}
              {pos.light2 && p.lightOther && (
                <div className="absolute -translate-y-1/2 text-left text-[22px] leading-[1.6] text-gray-800" style={{ top: pos.light2.top, left: pos.light2.left }}>
                  {p.lightOther}
                </div>
              )}

              {/* Arrosage */}
              {pos.watering && (
                <div className="absolute -translate-y-1/2 text-left text-[22px] leading-[1.6] text-gray-800" style={{ top: pos.watering.top, left: pos.watering.left }}>
                  {wateringLabel}
                </div>
              )}
              {pos.watering2 && p.wateringOther && (
                <div className="absolute -translate-y-1/2 text-left text-[22px] leading-[1.6] text-gray-800" style={{ top: pos.watering2.top, left: pos.watering2.left }}>
                  {p.wateringOther}
                </div>
              )}

              {/* Climat */}
              {pos.climate1 && (
                <div className="absolute -translate-y-1/2 text-left text-[22px] leading-[1.6] text-gray-800" style={{ top: pos.climate1.top, left: pos.climate1.left }}>
                  {climateLine}
                </div>
              )}
              {pos.climate2 && p.notes && (
                <div className="absolute -translate-y-1/2 text-left text-[22px] leading-[1.6] text-gray-800" style={{ top: pos.climate2.top, left: pos.climate2.left }}>
                  {p.notes}
                </div>
              )}

              {/* Rempotage */}
              {pos.repot1 && (
                <div className="absolute -translate-y-1/2 text-left text-[22px] leading-[1.6] text-gray-800" style={{ top: pos.repot1.top, left: pos.repot1.left }}>
                  {repotLine}
                </div>
              )}
              {pos.repot2 && p.repotOther && (
                <div className="absolute -translate-y-1/2 text-left text-[22px] leading-[1.6] text-gray-800" style={{ top: pos.repot2.top, left: pos.repot2.left }}>
                  {p.repotOther}
                </div>
              )}

              {/* Animaux (séparé, bas à droite) */}
              {pos.pet && (
                <div className="absolute -translate-y-1/2 text-left text-[22px] font-semibold text-gray-900" style={{ top: pos.pet.top, left: pos.pet.left }}>
                  {petSafeText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}