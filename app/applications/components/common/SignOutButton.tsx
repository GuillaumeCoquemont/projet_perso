"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
      onClick={() => signOut({ callbackUrl: "/login" })}
      title="Se déconnecter"
    >
      Se déconnecter
    </button>
  );
}