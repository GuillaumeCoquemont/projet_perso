import Link from "next/link";
import { prisma } from "../../lib/db";

export default async function PlantsPage() {
  const plants = await prisma.plant.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Plantes</h1>
        <Link href="/plants/new" className="border rounded px-3 py-2">Ajouter</Link>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {plants.map((p: (typeof plants)[number]) => (
          <li key={p.id} className="border rounded p-4">
            <div className="font-medium">{p.name}</div>
            {p.species && <div className="text-sm text-gray-600">{p.species}</div>}
          </li>
        ))}
        {plants.length === 0 && (
          <li className="text-sm text-gray-500">Aucune plante pour le moment.</li>
        )}
      </ul>
    </div>
  );
}