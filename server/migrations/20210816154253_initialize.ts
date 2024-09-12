import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await Promise.all([
    knex.schema.createTable("knowledgeCheckBlocks", (table) => {
      table.uuid("id").primary();
      table.uuid("questionId");
      table.string("feedback");
    }),
    knex.schema.createTable("questions", (table) => {
      table.uuid("id").primary();
      table.string("text");
      table.uuid("mediaId");
    }),
    knex.schema.createTable("answers", (table) => {
      table.uuid("id").primary();
      table.uuid("knowledgeCheckBlockId");
      table.string("text");
      table.boolean("isCorrect");
      table.integer("pos");
    }),
    knex.schema.createTable("media", (table) => {
      table.uuid("id").primary();
      table.string("type");
      table.string("url");
    }),
    knex.schema.createTable("uiState", (table) => {
      table.uuid("userId").primary();
      table.uuid("questionId");
      table.uuid("answerId");
    }),
  ]);

  await Promise.all([
    knex.schema.table("knowledgeCheckBlocks", (table) => {
      table.foreign("questionId").references("questions.id");
    }),
    knex.schema.table("questions", (table) => {
      table.foreign("mediaId").references("media.id");
    }),
    knex.schema.table("answers", (table) => {
      table
        .foreign("knowledgeCheckBlockId")
        .references("knowledgeCheckBlocks.id");
    }),
    knex.schema.table("uiState", (table) => {
      table.foreign("questionId").references("questions.id");
      table.foreign("answerId").references("answers.id");
      // NOTE: Had we implemented login...
      /* table.foreign("userId").references("users.id"); */
    }),
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all([
    knex.schema.table("knowledgeCheckBlocks", (table) => {
      table.dropForeign("questionId");
    }),
    knex.schema.table("questions", (table) => {
      table.dropForeign("mediaId");
    }),
    knex.schema.table("answers", (table) => {
      table.dropForeign("knowledgeCheckBlockId");
    }),
    knex.schema.table("uiState", (table) => {
      table.dropForeign("questionId");
      table.dropForeign("answerId");
      /* table.dropForeign("userId"); */
    }),
  ]);

  await Promise.all([
    knex.schema.dropTable("knowledgeCheckBlocks"),
    knex.schema.dropTable("questions"),
    knex.schema.dropTable("answers"),
    knex.schema.dropTable("media"),
  ]);
}
