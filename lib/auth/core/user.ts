import prisma from "@/lib/db/prisma";
import { PrismaClient } from "@prisma/client";
import { AuthError, AuthErrorCode, type UserProfile } from "./types";

// ────────────────────────────────────────────────
// Sync User with Database
// ────────────────────────────────────────────────
export async function syncUser(profile: UserProfile) {
  try {
    const user = await prisma.user.upsert({
      where: { email: profile.email },
      update: {
        name: profile.name,
        image: profile.image,
      },
      create: {
        email: profile.email,
        name: profile.name,
        image: profile.image,
      },
    });

    return user;
  } catch (error) {
    console.error("[auth:user] Failed to sync user:", error);
    throw new AuthError(
      AuthErrorCode.AUTHENTICATION_FAILED,
      "Failed to sync user with database",
      500,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}

// ────────────────────────────────────────────────
// Get User by ID
// ────────────────────────────────────────────────
export async function getUserById(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: { accounts: true },
    });
  } catch (error) {
    console.error("[auth:user] Failed to get user:", error);
    return null;
  }
}

// ────────────────────────────────────────────────
// Get User by Email
// ────────────────────────────────────────────────
export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });
  } catch (error) {
    console.error("[auth:user] Failed to get user by email:", error);
    return null;
  }
}

// ────────────────────────────────────────────────
// Serialize User for Session
// ────────────────────────────────────────────────
export function serializeUser(user: {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}) {
  return {
    id: user.id,
    name: user.name ?? undefined,
    email: user.email ?? undefined,
    image: user.image ?? undefined,
    role: user.role ?? "USER",
  };
}
