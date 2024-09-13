import React, { useEffect, useState } from "react";
import "./styles.module.css";
import { AggregatedKnowledgeBlock } from "@server/api";
import AsyncImage from "../AsyncImage";

type Props = {
  knowledgeCheckBlock: AggregatedKnowledgeBlock;
};

const KnowledgeBlock: React.FC<Props> = ({ knowledgeCheckBlock }: Props) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [prevAnswerId, setPrevAnswerId] = useState<string | null>(null);
  const [uiStateId, setUiStateId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedAnswerId);
  };

  // Initialize selected answers, if available
  // ASSUMPTION: Only one user -- otherwise, use context provider on authentication, pass along auth header, etc
  // ASSUMPTION: Only one question per knowledge block -- otherwise, manage answers per question id
  useEffect(() => {
    fetch(
      `http://localhost:5001/ui-state/${knowledgeCheckBlock.knowledgeCheckBlockId}`
    ).then(async (res) => {
      const data = await res.json();

      if (res.ok && data && data.length) {
        // ASSUMPTION: One result
        const { id, knowledgeCheckBlockId, answerId } = data[0];

        if (
          knowledgeCheckBlock.knowledgeCheckBlockId === knowledgeCheckBlockId
        ) {
          setSelectedAnswerId(answerId);
          setUiStateId(id);
        } else {
          console.warn(
            "KnowledgeBlock Mismatched Id: expected",
            knowledgeCheckBlock.knowledgeCheckBlockId,
            "received",
            knowledgeCheckBlockId
          );
        }
      }
    });
  }, []);

  // Update selected answer for user
  useEffect(() => {
    // ASSUMPTION: Optimistic updates
    if (selectedAnswerId && selectedAnswerId !== prevAnswerId) {
      fetch(`http://localhost:5001/ui-state`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uiStateId ?? "",
          knowledgeBlockId: knowledgeCheckBlock.knowledgeCheckBlockId,
          answerId: selectedAnswerId,
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            setPrevAnswerId(selectedAnswerId);

            if (!uiStateId) {
              const { id } = await res.json();

              setUiStateId(id);
            }
          } else {
            setSelectedAnswerId(prevAnswerId);
          }
        })
        .catch((e) => {
          setSelectedAnswerId(null);
          console.error(e);
        });
    }
  }, [selectedAnswerId]);

  return (
    <div className="question-form">
      <form onSubmit={handleSubmit}>
        <div className="question-group">
          <h2>{knowledgeCheckBlock.questionText}</h2>
          <AsyncImage url={knowledgeCheckBlock.mediaUrl ?? ""} />
          <ul>
            {knowledgeCheckBlock.answers
              .sort((a, b) => a.answerPos - b.answerPos)
              .map((kba) => (
                <li key={kba.answerId}>
                  <input
                    type={"radio"}
                    value={kba.answerId}
                    name={kba.answerId}
                    onChange={(e) => setSelectedAnswerId(e.target.value)}
                    checked={selectedAnswerId === kba.answerId}
                  />
                  <label>{kba.answerText}</label>
                </li>
              ))}
          </ul>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default KnowledgeBlock;
