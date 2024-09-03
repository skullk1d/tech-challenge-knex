export type KnowledgeCheckBlock = {
  id: string;
  questionId: string;
  feedback: string;
};

export type Media = {
  id: string;
  type: string;
  url: string;
};

export type Answer = {
  id: string;
  knowledgeCheckBlockId: string;
  text: string;
  isCorrect: boolean;
  pos: number;
};
