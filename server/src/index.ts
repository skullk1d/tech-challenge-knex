import express, { Request, Response } from "express";
import morgan from "morgan";

import knex from "./knex";
import { aggregateKnowledgeCheckBoxes } from "./queries";

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

app.listen(port, () => console.log(`Listening on port ${port}`));
