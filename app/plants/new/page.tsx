import { createPlant } from "../_server-actions";

export default function NewPlantPage() {
  return (
    <div className="p-6">
      <form action={createPlant} className="space-y-4 max-w-xl">
        <h1 className="text-xl font-semibold">Nouvelle plante</h1>
        <label className="block">
          <span className="text-sm">Nom *</span>
          <input name="name" placeholder="Ex: Monstera" className="border rounded px-3 py-2 w-full" required />
        </label>
        <label className="block">
          <span className="text-sm">Espèce</span>
          <input name="species" placeholder="Ex: Monstera deliciosa" className="border rounded px-3 py-2 w-full" />
        </label>
        <button className="border rounded px-3 py-2">Créer</button>
      </form>
    </div>
  );
}