import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const aiSass = pgTable("aiSass",{
    id:serial("id").primaryKey(),
    formData:varchar("formData").notNull(),
    aiResponse:text("aiResponse"),
    templateSlug:varchar("templateSlug").notNull(),
    createdAt:varchar("createdAt").notNull(),
    createdBy:varchar("createdBy"),
})