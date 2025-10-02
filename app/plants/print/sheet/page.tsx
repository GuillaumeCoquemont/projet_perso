import { prisma } from "@/lib/db";
import PrintableLabels from "../../components/PrintableLabels";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddIdForm from "./AddIdForm";
import { auth } from "@/lib/auth";

type Props = {
  searchParams?: { ids?: string };
};

export default async function PrintSheetPage({ searchParams }: Props) {
  const session = await auth();

  // 1) Parse ids from query string
  const raw = (searchParams?.ids ?? "").trim();
  const ids = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (ids.length === 0) {
    redirect("/plants/print");
  }

  // 2) Provide user plant options for the AddIdForm (name-based suggestions)
  const userOptions = session
    ? await prisma.plant.findMany({
        where: { ownerId: session.user.id },
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      })
    : [];

  // 3) Limit to 4 labels (fits your template)
  const idsLimited = ids.slice(0, 4);

  // 4) Fetch selected plants
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

  // Helper to remove an id from the current selection
  const removeHref = (removeId: string) => {
    const next = idsLimited.filter((x) => x !== removeId);
    return next.length ? `/plants/print/sheet?ids=${next.join(",")}` : "/plants/print";
  };

  return (
    <div className="p-4 print:p-0">
      {/* Toolbar (hidden when printing) */}
      <div className="mb-4 flex flex-col gap-4 print:hidden">
        <div className="flex gap-2">
          <Link href="/plants" className="border rounded px-3 py-2">Retour</Link>
        </div>
        <AddIdForm options={userOptions as any} />
        <div>
          <ul>
            {plants.map((plant) => (
              <li key={plant.id} className="mb-1 flex items-center justify-between">
                <span>{plant.name}</span>
                <Link href={removeHref(plant.id)} className="text-red-600 underline">
                  Retirer
                </Link>
              </li>
            ))}
          </ul>
          {plants.length < 4 && (
            <p className="mt-1 text-sm text-gray-600">{4 - plants.length} emplacement(s) libre(s)</p>
          )}
        </div>
      </div>

      {/* Printable sheet */}
      <PrintableLabels plants={plants as any} templateSrc="/templates/etiquettes.png" />
    </div>
  );
}