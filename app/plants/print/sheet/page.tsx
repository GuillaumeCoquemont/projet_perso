import { prisma } from "@/lib/db";
import PrintableLabels from "../../components/PrintableLabels";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  searchParams?: { ids?: string };
};

export default async function PrintSheetPage({ searchParams }: Props) {
  const raw = (searchParams?.ids ?? "").trim();
  const ids = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (ids.length === 0) {
    redirect("/plants/print");
  }

  const idsLimited = ids.slice(0, 4);

  const plants = await prisma.plant.findMany({
    where: { id: { in: idsLimited } },
    orderBy: { createdAt: "desc" },
  });

  if (plants.length === 0) {
    return (
      <div className="p-6">
        <p>Aucune plante trouvée pour ces identifiants.</p>
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
        plants={plants as any}
        templateSrc="/templates/etiquettes.png"
      />
    </div>
  );
}