import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "USER";
};
export type Session = { user: SessionUser } | null;

export async function auth(): Promise<Session> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  return {
    user: {
      id: (session.user as any).id,
      email: session.user.email,
      name: session.user.name ?? null,
      role: ((session.user as any).role ?? "USER") as "ADMIN" | "USER",
    },
  };
}