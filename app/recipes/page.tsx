import Link from "next/link";
import { prisma } from "../../lib/db";

export default async function RecipesPage() {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Recettes</h1>
        <Link href="/recipes/new" className="border rounded px-3 py-2">Ajouter</Link>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r: (typeof recipes)[number]) => (
          <li key={r.id} className="border rounded p-4">
            <div className="font-medium">{r.title}</div>
            {r.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{r.description}</p>
            )}
          </li>
        ))}
        {recipes.length === 0 && (
          <li className="text-sm text-gray-500">Aucune recette pour le moment.</li>
        )}
      </ul>
    </div>
  );
}