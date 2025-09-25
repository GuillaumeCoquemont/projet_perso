import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import PlantForm from "../../components/PlantForm";
import { updatePlant } from "../../_server-actions";
import Link from "next/link";

export default async function EditPlantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) {
    const { id } = await params;
    return (
      <div className="p-6">
        <p className="mb-2">Accès restreint.</p>
        <Link href={`/login?callbackUrl=/plants/${id}/edit`} className="underline">
          Se connecter
        </Link>
      </div>
    );
  }

  const { id } = await params;
  const plant = await prisma.plant.findUnique({ where: { id } });

  if (!plant) {
    return <div className="p-6">Plante introuvable.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Modifier la plante</h1>
      <PlantForm
        action={updatePlant}
        initialValues={plant}
        submitLabel="Mettre à jour"
      />
    </div>
  );
}