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

  res.send(knowledgeCheckBlocks);
};

const getAggregatedKnowledgeCheckBlocks = async (
  _req: Request,
  res: Response
) => {
  const knowledgeCheckBlocks = await selectAggregateKnowledgeCheckBoxes;

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

  res.send(uiState);
};

const postUiState = async (req: Request, res: Response) => {
  const { id, knowledgeBlockId, answerId } = req.body ?? {};

  // NOTE: Error handling should be more targeted
  if (!knowledgeBlockId || !answerId) {
    res.status(400).json({
      error: "knowledgeBlockId and answerId are required",
    });
  } else {
    try {
      const r = await insertUiState([id, knowledgeBlockId, answerId]);
      console.log(r);

      if (r) {
        const { id: id_ } = r && r[0];

        res.status(200).json({ id: id_, message: "setUiState SUCCESS" });
      } else {
        throw new Error("Could not POST record for id", id);
      }
    } catch (error) {
      console.error("setUiState ERROR:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const app = express();
const port = 5001;

app.use(express.json());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT");

  next();
});
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
