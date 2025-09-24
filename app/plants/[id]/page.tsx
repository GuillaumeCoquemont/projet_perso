import { prisma } from "@/lib/db";
import PlantCard from "../components/PlantCard";
import ActionBar from "@/app/applications/components/common/ActionBar";
import DeleteButton from "@/app/applications/components/common/DeleteButton";
import { deletePlant } from "../_server-actions";

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
      <ActionBar backHref="/plants" editHref={`/plants/${id}/edit`} className="no-print">
        <DeleteButton
          action={deletePlant}
          initial={{ ok: false }}
          fields={{ id }}
          confirmText="Supprimer cette fiche plante ?"
        />
      </ActionBar>
      <PlantCard plant={plant} />
    </div>
  );
}
