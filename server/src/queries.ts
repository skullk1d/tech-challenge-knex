// NOTE: Using knex file, not distribution
import knex from "./knex";

// Aggregate all knowledge boxes with media, questions, and answers.
//		Map correct & incorrect answers row to columns in joined table.
export const aggregateKnowledgeCheckBoxes = knex("knowledgeCheckBlocks")
  .join("questions", function () {
    this.on("questions.id", "=", "knowledgeCheckBlocks.questionId");
  })
  .join("media", function () {
    this.on("media.id", "=", "questions.mediaId");
  })
  .join("answers", function () {
    this.on("answers.knowledgeCheckBlockId", "=", "knowledgeCheckBlocks.id");
  })
  .select(
    "knowledgeCheckBlocks.id as knowledgeCheckBlockId",
    "knowledgeCheckBlocks.feedback",
    "questions.text as questionText",
    "media.type as mediaType",
    "media.url as mediaUrl"
  )
  .where("answers.isCorrect", "=", "true")
  .select(
    "answers.id as answerId",
    "answers.text as answerText",
    "answers.isCorrect as answerIsCorrect",
    "answers.pos as answerPos"
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
      .where("answers.isCorrect", "=", "false")
      .select(
        "answers.knowledgeCheckBlockId as answerKnowledgeCheckBlockId",
        "answers.id as answerId",
        "answers.text as answerText",
        "answers.isCorrect as answerIsCorrect",
        "answers.pos as answerPos"
      )
      .then((rows_) => {
        // ASSUMPTION: Knowledge blocks & answers already intersected at knowledge block id.
        //		Only 1 correct answer per knowledge block.
        //		Otherwise, listfy correct answers.
        // HACK: No time to get type imports to work
        const rowsHash = {} as Record<string, any>;

        // HACK: Brute force filtering per entry
        rows.forEach((r) => {
          rowsHash[r.knowledgeCheckBlockId] = {
            ...r,
            incorrectAnswers: rows_.filter(
              (r_) => r_.knowledgeCheckBlockId === r.answerKnowledgeCheckBlockId
            ),
          };
        });

        return Object.values(rowsHash);
      })
  );
