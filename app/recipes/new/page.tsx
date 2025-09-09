import { createRecipe } from "../_server-actions";

export default function NewRecipePage() {
  return (
    <div className="p-6">
      <form action={createRecipe} className="space-y-4 max-w-xl">
        <h1 className="text-xl font-semibold">Nouvelle recette</h1>

        <label className="block">
          <span className="text-sm">Titre *</span>
          <input
            name="title"
            placeholder="Ex: Pasta alla Norma"
            className="border rounded px-3 py-2 w-full"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm">Description</span>
          <textarea
            name="description"
            placeholder="Quelques mots sur la recette"
            className="border rounded px-3 py-2 w-full min-h-28"
          />
        </label>

        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" name="isPublic" /> Rendre publique
        </label>

        <button className="border rounded px-3 py-2">Créer</button>
      </form>
    </div>
  );
}