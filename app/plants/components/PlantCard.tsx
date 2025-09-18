type Plant = {
  name: string;
  species?: string | null;
  light?: string | null;
  lightOther?: string | null;
  watering?: string | null;
  wateringOther?: string | null;
  tempMinC?: number | null;
  tempMaxC?: number | null;
  humidityMin?: number | null;
  humidityMax?: number | null;
  repotMinYears?: number | null;
  repotMaxYears?: number | null;
  repotOther?: string | null;
  petSafe?: boolean | null;
  petNotes?: string | null;
  imageUrl?: string | null;
  notes?: string | null;
};

export default function PlantCard({ plant }: { plant: Plant }) {
  return (
    <article className="max-w-xl rounded-2xl shadow p-6 bg-white print:shadow-none print:p-0">
      <header className="flex items-center gap-4 mb-4">
        {plant.imageUrl ? (
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="h-20 w-20 rounded-md object-cover border"
          />
        ) : (
          <div className="h-20 w-20 rounded-md bg-gray-100 border" />
        )}
        <div>
          <h1 className="text-xl font-bold">{plant.name}</h1>
          {plant.species && <p className="text-gray-500">{plant.species}</p>}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="font-medium">Luminosité</p>
          <p className="text-gray-700">{plant.light ?? "—"}</p>
          {plant.lightOther && (
            <p className="text-gray-500">{plant.lightOther}</p>
          )}
        </div>

        <div>
          <p className="font-medium">Arrosage</p>
          <p className="text-gray-700">{plant.watering ?? "—"}</p>
          {plant.wateringOther && (
            <p className="text-gray-500">{plant.wateringOther}</p>
          )}
        </div>

        <div>
          <p className="font-medium">Température</p>
          <p className="text-gray-700">
            {plant.tempMinC ?? "?"}–{plant.tempMaxC ?? "?"} °C
          </p>
        </div>

        <div>
          <p className="font-medium">Humidité</p>
          <p className="text-gray-700">
            {plant.humidityMin ?? "?"}–{plant.humidityMax ?? "?"} %
          </p>
        </div>

        <div className="col-span-2">
          <p className="font-medium">Rempotage</p>
          <p className="text-gray-700">
            {plant.repotMinYears ?? "?"}–{plant.repotMaxYears ?? "?"} ans
          </p>
          {plant.repotOther && (
            <p className="text-gray-500">{plant.repotOther}</p>
          )}
        </div>

        <div className="col-span-2">
          <p className="font-medium">Animaux</p>
          <p className="text-gray-700">
            {plant.petSafe == null
              ? "—"
              : plant.petSafe
              ? "Sans danger"
              : "Toxique"}
          </p>
          {plant.petNotes && <p className="text-gray-500">{plant.petNotes}</p>}
        </div>

        {plant.notes && (
          <div className="col-span-2">
            <p className="font-medium">Notes</p>
            <p className="text-gray-700 whitespace-pre-wrap">{plant.notes}</p>
          </div>
        )}
      </div>
    </article>
  );
}
