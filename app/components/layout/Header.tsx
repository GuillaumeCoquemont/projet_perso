import Link from "next/link";
import { auth } from "@/lib/auth";
import SignOutButton from "@/app/applications/components/common/SignOutButton";
import HeaderNav from "./HeaderNav";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-white border-b shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <span className="font-bold text-lg">Projet perso</span>
        <HeaderNav /> {/* la partie client */}
        <div>
          {session ? (
            <div className="flex items-center gap-3">
              <span>{session.user.email}</span>
              <SignOutButton />
            </div>
          ) : (
            <Link href="/login">Se connecter</Link>
          )}
        </div>
      </nav>
    </header>
  );
}