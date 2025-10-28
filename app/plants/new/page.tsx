import PlantForm from "../components/PlantForm";
import { createPlant } from "../_server-actions";
import { auth } from "@/lib/auth";
import { ButtonLink } from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";

export default async function NewPlantPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="p-6 text-center space-y-3">
        <p className="text-gray-700">Accès restreint.</p>
        <ButtonLink
          as="link"
          href={`/login?callbackUrl=${encodeURIComponent("/plants/new")}`}
          variant="primary"
        >
          Se connecter
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold text-gray-800">Nouvelle plante</h1>
      <Card className="max-w-xl mx-auto">
        <PlantForm action={createPlant} submitLabel="Créer" />
      </Card>
    </div>
  );
}