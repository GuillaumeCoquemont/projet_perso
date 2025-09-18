"use client";

export default function PetField() {
  return (
    <div className="space-y-2">
      <label className="block font-medium">Animaux</label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" name="petSafe" className="border p-2" />
        <span>Sans danger pour les animaux</span>
      </label>
      <input
        type="text"
        name="petNotes"
        placeholder="Notes sur la sécurité pour les animaux"
        className="border p-2 w-full"
      />
    </div>
  );
}
