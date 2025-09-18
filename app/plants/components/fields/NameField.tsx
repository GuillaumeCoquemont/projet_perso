export default function NameField() {
  return (
    <div className="space-y-2">
      <label className="block font-medium">Nom</label>
      <input
        type="text"
        name="name"
        placeholder="Nom de la plante"
        required
        autoFocus
        className="border p-2 w-full"
      />
    </div>
  );
}
