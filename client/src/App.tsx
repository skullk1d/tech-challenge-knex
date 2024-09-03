import React, { useEffect, useState } from "react";

import logoRise360 from "./logo-rise-360.svg";
import logoRiseCom from "./logo-rise-com.svg";
import "./App.css";
import AsyncImage from "./components/AsyncImage";

import type { AggregatedKnowledgeBlock } from "@server/api";

function App() {
  const [knowledgeBlocks, setKnowledgeBlocks] = useState<
    Array<AggregatedKnowledgeBlock>
  >([]);

  useEffect(() => {
    fetch("http://localhost:5001/knowledge-check-blocks-aggregated").then(
      async (res) => {
        const data = await res.json();

        setKnowledgeBlocks(data);
      }
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logoRiseCom} className="App-logo" alt="logo" />
        <h1>Rise Tech Challenge</h1>
        <img src={logoRise360} className="App-logo" alt="logo" />
      </header>
      <section className="App-section">
        {
          "Please populate this view with your implementation of the knowledge check block using the API available at "
        }
        <span className="App-code">{"/knowledge-check-blocks"}</span>
      </section>
      <section className="knowledge-check">
        {knowledgeBlocks.map((kb) => (
          <div key={kb.knowledgeCheckBlockId}>
            <h2>{kb.questionText}</h2>
            <AsyncImage url={kb.mediaUrl ?? ""} />

            <form>
              <label>{kb.answerText}</label>
              <input type={"radio"} value={kb.answerId} name="kb.answerId" />
            </form>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
