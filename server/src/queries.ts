// NOTE: Using knex file, not distribution
import knex from "./knex";

// Aggregate all knowledge boxes with media, questions, and answers.
//		Map correct & incorrect answers row to columns in joined table.
export const aggregateKnowledgeCheckBoxes = knex
  .select("*")
  .from("knowledgeCheckBlocks")
  .join("questions", function () {
    this.on("questions.id", "=", "knowledgeCheckBlocks.questionId");
  })
  .join("media", function () {
    this.on("media.id", "=", "questions.mediaId");
  })
  .innerJoin("answers", function () {
    this.on("answers.knowledgeCheckBlockId", "=", "knowledgeCheckBlocks.id");
    /* .andOn("answers.isCorrect", "=", "true"); */
    /* .as("answer_correct"); */
  });
