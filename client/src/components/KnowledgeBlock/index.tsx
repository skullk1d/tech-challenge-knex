import React, { useCallback, useEffect, useState } from "react";
import "./styles.module.css";
import { AggregatedKnowledgeBlock } from "@server/api";
import AsyncImage from "../AsyncImage";

import styles from "./styles.module.css";

type Props = {
  knowledgeCheckBlock: AggregatedKnowledgeBlock;
};

type Status = "correct" | "incorrect" | "error" | "no-answer" | "default";

const KnowledgeBlock: React.FC<Props> = ({ knowledgeCheckBlock }: Props) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [prevAnswerId, setPrevAnswerId] = useState<string | null>(null);
  const [uiStateId, setUiStateId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("default");

  const handleOnChangeAnswer = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedAnswerId(e.target.value);
      setStatus("default");
    },

    [selectedAnswerId]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAnswerId) {
      setStatus("no-answer");
    }
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
    <section className={styles["knowledge-block"]}>
      <div className={styles["knowledge-block__question-form"]}>
        <form onSubmit={handleSubmit}>
          <div className="knowledge-block__question-group">
            <h2 className={styles["knowledge-block__question-text"]}>
              {knowledgeCheckBlock.questionText}
            </h2>
            <AsyncImage
              url={knowledgeCheckBlock.mediaUrl ?? ""}
              className={styles["knowledge-block__async-image"]}
            />
            <ul className={styles["knowledge-block__answer-group"]}>
              {knowledgeCheckBlock.answers
                .sort((a, b) => a.answerPos - b.answerPos)
                .map((kba) => (
                  <li
                    key={kba.answerId}
                    onClick={() => setSelectedAnswerId(kba.answerId)}
                  >
                    <input
                      type={"radio"}
                      value={kba.answerId}
                      name={kba.answerId}
                      onChange={handleOnChangeAnswer}
                      checked={selectedAnswerId === kba.answerId}
                    />
                    <label>{kba.answerText}</label>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles["knowledge-block__action-group"]}>
            {status === "no-answer" ? (
              <div
                className={styles["knowledge-block__action-group__validation"]}
              >
                <span style={{ marginInlineEnd: "1rem" }}>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="circle-exclamation"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{
                      display: "inline-block",
                      height: "1em",
                      overflow: "visible",
                      verticalAlign: "-0.125em",
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM256 304c13.25 0 24-10.75 24-24v-128C280 138.8 269.3 128 256 128S232 138.8 232 152v128C232 293.3 242.8 304 256 304zM256 337.1c-17.36 0-31.44 14.08-31.44 31.44C224.6 385.9 238.6 400 256 400s31.44-14.08 31.44-31.44C287.4 351.2 273.4 337.1 256 337.1z"
                    ></path>
                  </svg>
                </span>
                Please answer the question to continue
              </div>
            ) : null}
            {["default", "no-answer"].includes(status) ? (
              <button type="submit">Submit</button>
            ) : null}
          </div>
          <div className={styles["knowledge-block__result-group"]}>
            <div className={styles[`knowledge-block__result-group__icon`]}>
              <i className={styles[`${status}`]}></i>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default KnowledgeBlock;
