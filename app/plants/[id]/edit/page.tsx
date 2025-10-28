
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import PlantForm from "../../components/PlantForm";
import { updatePlant } from "../../_server-actions";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";

export default async function EditPlantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();
  if (!session) {
    return (
      <div className="p-6 text-center space-y-3">
        <p className="text-gray-700">Accès restreint.</p>
        <ButtonLink
          as="link"
          href={`/login?callbackUrl=${encodeURIComponent(`/plants/${id}/edit`)}`}
          variant="primary"
        >
          Se connecter
        </ButtonLink>
      </div>
    );
  }

  const plant = await prisma.plant.findUnique({ where: { id } });
  if (!plant) {
    notFound();
  }

  const isAdmin = String(session.user.role || "").toUpperCase() === "ADMIN";
  const isOwner = plant!.ownerId === session.user.id;
  if (!isAdmin && !isOwner) {
    return (
      <div className="p-6 space-y-3">
        <p className="mb-1">Non autorisé à modifier cette plante.</p>
        <ButtonLink as="link" href={`/plants/${id}`} variant="secondary">
          Retour à la fiche
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Modifier la plante</h1>
        <ButtonLink as="link" href={`/plants/${id}`} variant="secondary">
          Annuler
        </ButtonLink>
      </div>

      <Card className="max-w-xl">
        <PlantForm
          action={updatePlant}
          initialValues={plant}
          submitLabel="Mettre à jour"
        />
      </Card>
    </div>
  );
}