"use client";

type Props = {
  defaultValue?: string | null;
};

export default function NameField({ defaultValue }: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor="name" className="block font-medium">
        Nom
      </label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Nom de la plante"
        required
        autoFocus
        className="border p-2 w-full"
        defaultValue={defaultValue ?? ""}
      />
    </div>
  );
}