import {
    pgTable,
    text,
    varchar,
    timestamp,
    boolean,
    uuid,
    pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enum for Subscription Types
export const subscriptionType = pgEnum("subscriptionType", [
    "basic",
    "gold",
    "platinum",
]);

// Users Table
export const Users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(), // Ensure email is unique
    password: varchar("password", { length: 255 }),
    username: varchar("username", { length: 255 }).notNull().unique(),
    profileUrl: varchar("profileUrl", { length: 512 }),
    name: varchar("name", { length: 255 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    verifyCode: varchar("verifyCode", { length: 6 }),
    subscription: subscriptionType("subscription").default("basic"), // Default to 'basic'
});

// Content Table
export const Content = pgTable("content", {
    id: uuid("id").defaultRandom().primaryKey(),
    formData: text("formData"),
    aiResponse: text("aiResponse"),
    toolName: varchar("toolName", { length: 255 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    createdBy: varchar("createdBy", { length: 255 }).notNull(), // Foreign key to users' email
});

// Subscription Table
export const Subscription = pgTable("subscription", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).notNull(), // Foreign key to users' email
    username: varchar("username", { length: 255 }).notNull(),
    expiryDate: timestamp("expiryDate").notNull(),
    createdDate: timestamp("createdDate").defaultNow().notNull(),
    active: boolean("active").default(true),
    paymentId: varchar("paymentId", { length: 255 }),
    plan: subscriptionType("plan").notNull(), // Enum for subscription plan
});

// Define relationships using Drizzle's "relations" method
export const usersRelations = relations(Users, ({ many }) => ({
    contents: many(Content),
    subscriptions: many(Subscription),
}));

export const contentRelations = relations(Content, ({ one }) => ({
    createdByUser: one(Users, {
        fields: [Content.createdBy],
        references: [Users.email], // Reference Users' email
    }),
}));

export const subscriptionRelations = relations(Subscription, ({ one }) => ({
    user: one(Users, {
        fields: [Subscription.email],
        references: [Users.email], // Reference Users' email
    }),
}));
