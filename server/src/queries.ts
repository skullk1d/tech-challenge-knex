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
      .orderBy("answerPos", "asc")
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
  body: [id: string, knowledgeBlockId: string, answerId: string]
) => {
  // Insert triples representing selected question-and-answer pairs
  const [id, knowledgeBlockId, answerId] = body;

  if (id) {
    // TODO: PUT method
    return knex("uiState").update({ answerId }).where({ id }).returning("id");
  } else {
    // Proxy for primary entity or "user id", whose implementation we've omitted
    const id_ = id || uuid();

    return knex("uiState")
      .insert([{ id: id_, knowledgeCheckBlockId: knowledgeBlockId, answerId }])
      .into("uiState")
      .returning("id");
  }
};

export const selectUiState = async (knowledgeBlockId: string) =>
  knex("uiState")
    .select("*")
    .where("uiState.knowledgeCheckBlockId", "=", knowledgeBlockId);
