import { prisma } from "@/lib/db";
import PlantCard from "../components/PlantCard";

export default async function PlantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const plant = await prisma.plant.findUnique({ where: { id: params.id } });
  if (!plant) return <div className="p-6">Plante introuvable.</div>;

  return (
    <div className="p-6">
      <PlantCard plant={plant} />
    </div>
  );
}
