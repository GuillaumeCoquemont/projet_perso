import Link from "next/link";
import { prisma } from "../../lib/db";
import FilterBar from "./components/FilterBar";
import { auth } from "@/lib/auth";

type Search = {
  q?: string;
  light?: string;
  watering?: string;
  petSafe?: string;
  page?: string;
};

export default async function PlantsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { q, light, watering, petSafe, page } = await searchParams;
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";
  const ownerFilter = isAdmin ? {} : { ownerId: session?.user?.id };

  const take = 12;
  const pageNum = page ? Math.max(parseInt(page, 10), 1) : 1;
  const skip = (pageNum - 1) * take;

  const where: any = {
    ...ownerFilter,
  };

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { species: { contains: q } },
    ];
  }

  if (light) {
    where.light = light;
  }

  if (watering) {
    where.watering = watering;
  }

  if (petSafe) {
    where.petSafe = petSafe === "true";
  }

  const [plants, total] = await Promise.all([
    prisma.plant.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take,
      skip,
    }),
    prisma.plant.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / take));

  function mkUrl(newPage: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (light) params.set("light", light);
    if (watering) params.set("watering", watering);
    if (petSafe) params.set("petSafe", petSafe);
    params.set("page", newPage.toString());
    return `/plants?${params.toString()}`;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Plantes</h1>
        <Link href="/plants/new" className="border rounded px-3 py-2">
          Ajouter
        </Link>
      </div>
      <FilterBar />

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {plants.map((p: (typeof plants)[number]) => (
          <li key={p.id} className="border rounded p-4 hover:shadow">
            <Link href={`/plants/${p.id}`}>
              <div className="font-medium">{p.name}</div>
              {p.species && (
                <div className="text-sm text-gray-600">{p.species}</div>
              )}
            </Link>
          </li>
        ))}
        {plants.length === 0 && (
          <li className="text-sm text-gray-500">
            Aucune plante pour le moment.
          </li>
        )}
      </ul>

      <div className="flex items-center justify-center space-x-4">
        <Link
          href={pageNum > 1 ? mkUrl(pageNum - 1) : "#"}
          className={`px-3 py-1 border rounded ${pageNum === 1 ? "opacity-50 pointer-events-none" : ""}`}
        >
          Précédent
        </Link>
        <span>
          Page {pageNum} sur {totalPages}
        </span>
        <Link
          href={pageNum < totalPages ? mkUrl(pageNum + 1) : "#"}
          className={`px-3 py-1 border rounded ${pageNum === totalPages ? "opacity-50 pointer-events-none" : ""}`}
        >
          Suivant
        </Link>
      </div>
    </div>
  );
}
