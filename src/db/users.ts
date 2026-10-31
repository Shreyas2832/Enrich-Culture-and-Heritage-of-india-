import { db } from './index.ts';
import { users, civicReports, travelerCheckpoints, groupExpeditions } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, name?: string) {
  try {
    const result = await db.insert(users)
      .values({
        uid,
        email,
        name: name || '',
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(name ? { name } : {}),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Failed to get or create user:", error);
    throw new Error("Failed to register user in database.", { cause: error });
  }
}

export async function getUserByUid(uid: string) {
  try {
    const result = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Failed to fetch user by uid:", error);
    throw new Error("Failed to fetch user.", { cause: error });
  }
}

export async function updateUserProfile(uid: string, data: { name?: string; travelMode?: string; emergencyContact?: string }) {
  try {
    const result = await db.update(users)
      .set(data)
      .where(eq(users.uid, uid))
      .returning();
    return result[0] || null;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw new Error("Failed to update profile.", { cause: error });
  }
}

// Civic Reports
export async function getCivicReports() {
  try {
    return await db.select().from(civicReports).orderBy(desc(civicReports.createdAt));
  } catch (error) {
    console.error("Database query failed for civicReports:", error);
    throw new Error("Failed to fetch civic reports.", { cause: error });
  }
}

export async function createCivicReport(data: {
  userId?: number;
  siteName: string;
  location: string;
  category: string;
  severity: string;
  description: string;
  reporterName?: string;
}) {
  try {
    const result = await db.insert(civicReports).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("Failed to create civic report in database:", error);
    throw new Error("Failed to submit civic report.", { cause: error });
  }
}

// Checkpoints
export async function getUserCheckpoints(userId: number) {
  try {
    return await db.select().from(travelerCheckpoints).where(eq(travelerCheckpoints.userId, userId));
  } catch (error) {
    console.error("Failed to fetch checkpoints:", error);
    throw new Error("Failed to fetch user checkpoints.", { cause: error });
  }
}

export async function addCheckpoint(data: {
  userId: number;
  siteId: number;
  siteName: string;
  notes?: string;
  rating?: number;
}) {
  try {
    const result = await db.insert(travelerCheckpoints).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("Failed to add checkpoint:", error);
    throw new Error("Failed to record checkpoint.", { cause: error });
  }
}

// Expeditions
export async function getGroupExpeditions() {
  try {
    return await db.select().from(groupExpeditions).orderBy(desc(groupExpeditions.createdAt));
  } catch (error) {
    console.error("Failed to fetch group expeditions:", error);
    throw new Error("Failed to fetch group expeditions.", { cause: error });
  }
}
