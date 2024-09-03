export type KnowledgeCheckBlock = {
  id: string;
  questionId: string;
  feedback: string;
};

export type Question = {
  id: string;
  text: string;
  mediaId: string;
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

// Mappings
export type MappedAnswer = {
  answerId: Answer["id"];
  answerText: Answer["text"];
  answerIsCorrect: Answer["isCorrect"];
  answerPos: Answer["pos"];
};

export type AggregatedKnowledgeBlock = {
  knowledgeCheckBlockId: KnowledgeCheckBlock["id"];
  feedback: KnowledgeCheckBlock["feedback"];
  questionText: Question["text"];
  mediaType: Media["type"];
  mediaUrl: Media["url"];
  incorrectAnswers: Array<
    MappedAnswer & {
      answerKnowledgeCheckBlockId: Answer["knowledgeCheckBlockId"];
    }
  >;
} & MappedAnswer;
