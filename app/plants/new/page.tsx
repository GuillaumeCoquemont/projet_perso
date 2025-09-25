import PlantForm from "../components/PlantForm";
import { createPlant } from "../_server-actions";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function NewPlantPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="p-6">
        <p className="mb-2">Accès restreint.</p>
        <Link
          href={`/login?callbackUrl=${encodeURIComponent("/plants/new")}`}
          className="underline"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Nouvelle plante</h1>
      <PlantForm action={createPlant} submitLabel="Créer" />
    </div>
  );
}