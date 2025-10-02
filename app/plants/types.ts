
export type Plant = {
    id: string;
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
  
  export type PlantForLabel = Pick<
    Plant,
    | "id"
    | "name"
    | "light"
    | "lightOther"
    | "watering"
    | "wateringOther"
    | "tempMinC"
    | "tempMaxC"
    | "humidityMin"
    | "humidityMax"
    | "repotMinYears"
    | "repotMaxYears"
    | "repotOther"
    | "petSafe"
    | "petNotes"
    | "notes"
  >;