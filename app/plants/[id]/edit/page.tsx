import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import PlantForm from "../../components/PlantForm";
import { updatePlant } from "../../_server-actions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditPlantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();
  if (!session) {
    return (
      <div className="p-6">
        <p className="mb-2">Accès restreint.</p>
        <Link
          href={`/login?callbackUrl=${encodeURIComponent(`/plants/${id}/edit`)}`}
          className="underline"
        >
          Se connecter
        </Link>
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
      <div className="p-6">
        <p className="mb-4">Non autorisé à modifier cette plante.</p>
        <Link href={`/plants/${id}`} className="underline">Retour à la fiche</Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Modifier la plante</h1>
        <Link href={`/plants/${id}`} className="text-sm underline">Annuler</Link>
      </div>
      <PlantForm
        action={updatePlant}
        initialValues={plant}
        submitLabel="Mettre à jour"
      />
    </div>
  );
}