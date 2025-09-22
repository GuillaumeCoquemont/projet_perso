import { prisma } from "@/lib/db";
import ActionBar from "../../applications/components/common/ActionBar";
import DeleteButton from "../../applications/components/common/DeleteButton";
import { deletePlant } from "../_server-actions";
import PlantCard from "../components/PlantCard";

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plant = await prisma.plant.findUnique({ where: { id } });
  if (!plant) return <div className="p-6">Plante introuvable.</div>;

  return (
    <div className="p-6">
      <ActionBar backHref="/plants" editHref={`/plants/${plant.id}/edit`}>
        <DeleteButton
          action={deletePlant}
          initial={{ ok: false }}
          fields={{ id: plant.id }}
          confirmText="Supprimer cette fiche plante ?"
        />
      </ActionBar>
      <PlantCard plant={plant} />
    </div>
  );
}
