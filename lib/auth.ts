import { prisma } from "./db";

export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "USER";
};

export type Session = { user: SessionUser } | null;

export async function auth(): Promise<Session> {
  const preferEmail = process.env.DEV_USER_EMAIL ?? undefined;

  const user = await prisma.user.findFirst({
    where: preferEmail ? { email: preferEmail, isActive: true } : { isActive: true },
    orderBy: { createdAt: "asc" },
  });

  if (!user) return null;

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name ?? null,
      role: user.role as "ADMIN" | "USER",
    },
  };
}