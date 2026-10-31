import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table matching Firebase Auth UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name'),
  travelMode: text('travel_mode').default('solo'),
  emergencyContact: text('emergency_contact'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Civic heritage reports table
export const civicReports = pgTable('civic_reports', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  siteName: text('site_name').notNull(),
  location: text('location').notNull(),
  category: text('category').notNull(),
  severity: text('severity').notNull(),
  description: text('description').notNull(),
  reporterName: text('reporter_name'),
  status: text('status').default('verified'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Solo & Group travel checkpoints / visits
export const travelerCheckpoints = pgTable('traveler_checkpoints', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  siteId: integer('site_id').notNull(),
  siteName: text('site_name').notNull(),
  visitedAt: timestamp('visited_at').defaultNow(),
  notes: text('notes'),
  rating: integer('rating').default(5),
});

// Group Expeditions
export const groupExpeditions = pgTable('group_expeditions', {
  id: serial('id').primaryKey(),
  leaderId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  title: text('title').notNull(),
  heritageRoute: text('heritage_route').notNull(),
  memberCount: integer('member_count').default(1),
  departureDate: text('departure_date').notNull(),
  status: text('status').default('planning'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  reports: many(civicReports),
  checkpoints: many(travelerCheckpoints),
  expeditions: many(groupExpeditions),
}));

export const civicReportsRelations = relations(civicReports, ({ one }) => ({
  author: one(users, {
    fields: [civicReports.userId],
    references: [users.id],
  }),
}));

export const travelerCheckpointsRelations = relations(travelerCheckpoints, ({ one }) => ({
  traveler: one(users, {
    fields: [travelerCheckpoints.userId],
    references: [users.id],
  }),
}));

export const groupExpeditionsRelations = relations(groupExpeditions, ({ one }) => ({
  leader: one(users, {
    fields: [groupExpeditions.leaderId],
    references: [users.id],
  }),
}));
