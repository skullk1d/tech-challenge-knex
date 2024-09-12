// NOTE: Using knex file, not distribution
import knex from "./knex";
import { v4 as uuid } from "uuid";

// Aggregate all knowledge boxes with media, questions, and answers.
//		Map correct & incorrect answers row to columns in joined table.
export const selectAggregateKnowledgeCheckBoxes = knex("knowledgeCheckBlocks")
  .join("questions", function () {
    this.on("questions.id", "=", "knowledgeCheckBlocks.questionId");
  })
  .join("media", function () {
    this.on("media.id", "=", "questions.mediaId");
  })
  .select(
    "knowledgeCheckBlocks.id as knowledgeCheckBlockId",
    "knowledgeCheckBlocks.feedback",
    "questions.text as questionText",
    "media.type as mediaType",
    "media.url as mediaUrl"
  )
  .then((rows) =>
    // Decorate with incorrect answers
    // HACK: Should probably use WITH and/or GROUP BY clauses to do this
    knex("answers")
      .join("knowledgeCheckBlocks", function () {
        this.on(
          "answers.knowledgeCheckBlockId",
          "=",
          "knowledgeCheckBlocks.id"
        );
      })
      .select(
        "answers.knowledgeCheckBlockId as answerKnowledgeCheckBlockId",
        "answers.id as answerId",
        "answers.text as answerText",
        "answers.isCorrect as answerIsCorrect",
        "answers.pos as answerPos"
      )
      .then(async (rows_) => {
        // ASSUMPTION: Knowledge blocks & answers already intersected at knowledge block id.
        //		Only 1 correct answer per knowledge block.
        //		Otherwise, listfy correct answers.
        // HACK: No time to get type imports to work
        const rowsHash = {} as Record<string, any>;

        // HACK: Brute force filtering per entry
        rows.forEach((r) => {
          rowsHash[r.knowledgeCheckBlockId] = {
            ...r,
            answers: rows_.filter(
              (r_) => r_.answerKnowledgeCheckBlockId === r.knowledgeCheckBlockId
            ),
          };
        });

        return Object.values(rowsHash);
      })
  );

export const insertUiState = async (
  body: [/* userId: string,  */ knowledgeBlockId: string, answerId: string]
) => {
  // Proxy for primary entity or "user id", whose implementation we've omitted
  const id = uuid();

  // Insert triples representing selected question-and-answer pairs
  body.forEach(async ([/* userId,  */ knowledgeBlockId, answerId]) => {
    knex("uiState")
      .insert([{ /* userId,  */ knowledgeBlockId, answerId }])
      .into("uiState")
      .then((r) => {
        console.log(r);

        return id;
      });
  });
};

export const selectUiState = async (knowledgeBlockId: string) =>
  knex("uiState")
    .select("uiState.answerId")
    .where("uiState.knowledgeCheckBlockId", "=", knowledgeBlockId);
