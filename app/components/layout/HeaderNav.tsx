"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/plants", label: "Plantes" },
  { href: "/recipes", label: "Recettes" },
  { href: "/applications", label: "Candidatures" },
];

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-6">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={
              pathname === item.href || pathname.startsWith(item.href + "/")
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}