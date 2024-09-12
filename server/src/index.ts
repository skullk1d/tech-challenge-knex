import express, { Request, Response } from "express";
import morgan from "morgan";

import knex from "./knex";
import {
  selectAggregateKnowledgeCheckBoxes,
  insertUiState,
  selectUiState,
} from "./queries";

const getKnowledgeCheckBlocks = async (_req: Request, res: Response) => {
  const knowledgeCheckBlocks = await knex("knowledgeCheckBlocks");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(knowledgeCheckBlocks);
};

const getAggregatedKnowledgeCheckBlocks = async (
  _req: Request,
  res: Response
) => {
  const knowledgeCheckBlocks = await selectAggregateKnowledgeCheckBoxes;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(knowledgeCheckBlocks);
};

/*
// DEBUG
const getMedia = async (req: Request, res: Response) => {
  const media = await knex("media");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(media);
};
*/

const getUiState = async (req: Request, res: Response) => {
  const knowledgeBlockId = req.params.id;
  const uiState = await selectUiState(knowledgeBlockId);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(uiState);
};

const postUiState = async (req: Request, res: Response) => {
  const { userId, knowledgeBlockId, answerId } = req.body;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");

  // NOTE: Error handling should be more targeted
  if (!userId || !knowledgeBlockId || !answerId) {
    res
      .status(400)
      .json({ error: "userId, knowledgeBlockId and answerId are required" });
  } else {
    try {
      const id = await insertUiState([
        /* userId,  */ knowledgeBlockId,
        answerId,
      ]);

      res.status(200).json({ uiStateId: id, message: "setUiState SUCCESS" });
    } catch (error) {
      console.error("setUiState ERROR:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const app = express();
const port = 5001;

app.use(morgan("dev"));

app.get("/knowledge-check-blocks", getKnowledgeCheckBlocks);
app.get(
  "/knowledge-check-blocks-aggregated",
  getAggregatedKnowledgeCheckBlocks
);
/*
// DEBUG
app.get("/media", getMedia);
*/

app.get("/ui-state/:id", getUiState);
app.post("/ui-state", postUiState);
/* app.put("/ui-state:id", putUiState); */

app.listen(port, () => console.log(`Listening on port ${port}`));
