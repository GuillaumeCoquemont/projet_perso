import { prisma } from "@/lib/db";
import PrintableLabels from "../components/PrintableLabels";
import Link from "next/link";

export default async function PrintPage() {
  const plants = await prisma.plant.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  if (plants.length === 0) {
    return (
      <div className="p-6">
        <p>Aucune plante trouvée.</p>
        <Link href="/plants" className="underline">Retour</Link>
      </div>
    );
  }

  return (
    <div className="p-4 print:p-0">
      <div className="mb-4 flex gap-2 print:hidden">
        <Link href="/plants" className="border rounded px-3 py-2">Retour</Link>
      </div>

      <PrintableLabels
        plants={plants}
        templateSrc="/templates/etiquettes.png"
      />
    </div>
  );
}