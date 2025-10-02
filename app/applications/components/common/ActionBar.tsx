"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  backHref?: string;
  editHref?: string;
  className?: string;
  hidePrint?: boolean;
  printHref?: string;
}>;

/** Why: centraliser les actions communes (réutilisable sur toutes les fiches) */
export default function ActionBar({
  backHref = "/",
  editHref,
  hidePrint = false,
  printHref,
  className = "",
  children,
}: Props) {
  return (
    <div className={`mb-6 flex flex-wrap items-center gap-2 ${className}`}>
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          ← Retour
        </Link>
      )}

      {!hidePrint && (
        <Link
          href={printHref ?? "/plants/print"}
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
          title="Imprimer"
        >
          Imprimer
        </Link>
      )}

      {editHref ? (
        <Link
          href={editHref}
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          Éditer
        </Link>
      ) : null}

      <div className="ml-auto flex items-center gap-2">{children}</div>
    </div>
  );
}
