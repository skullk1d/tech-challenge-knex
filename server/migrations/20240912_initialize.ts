import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await Promise.all([
    knex.schema.createTable("uiState", (table) => {
      table.uuid("id").primary();
      table.uuid("knowledgeCheckBlockId");
      table.uuid("answerId");
    }),
  ]);

  await Promise.all([
    knex.schema.table("uiState", (table) => {
      table
        .foreign("knowledgeCheckBlockId")
        .references("knowledgeCheckBlocks.id");
      table.foreign("answerId").references("answers.id");
    }),
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all([
    knex.schema.table("uiState", (table) => {
      table.dropForeign("knowledgeCheckBlockId");
      table.dropForeign("answerId");
      /* table.dropForeign("userId"); */
    }),
  ]);

  await Promise.all([knex.schema.dropTable("uiState")]);
}
