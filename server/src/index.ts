import express, { Request, Response } from "express";
import morgan from "morgan";

import knex from "./knex";
import { aggregateKnowledgeCheckBoxes, setUiState } from "./queries";

const getKnowledgeCheckBlocks = async (req: Request, res: Response) => {
  const knowledgeCheckBlocks = await knex("knowledgeCheckBlocks");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(knowledgeCheckBlocks);
};

const getAggregatedKnowledgeCheckBlocks = async (
  req: Request,
  res: Response
) => {
  const knowledgeCheckBlocks = await aggregateKnowledgeCheckBoxes;

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

const postUiState = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await setUiState(body);

    res.status(200).json({ message: "setUiState SUCCESS" });
  } catch (error) {
    console.error("setUiState ERROR:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* const putUiState = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await updateUiState(id, body);

    res.status(200).json({ message: "putUiState SUCCESS" });
  } catch (error) {
    console.error("putUiState ERROR:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}; */

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

app.post("/ui-state", postUiState);
/* app.put("/ui-state:id", putUiState); */

app.listen(port, () => console.log(`Listening on port ${port}`));
