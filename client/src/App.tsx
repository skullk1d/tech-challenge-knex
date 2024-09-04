import React, { useEffect, useState } from "react";

import logoRise360 from "./logo-rise-360.svg";
import logoRiseCom from "./logo-rise-com.svg";
import "./App.css";

import type { AggregatedKnowledgeBlock } from "@server/api";
import KnowledgeBlock from "./components/KnowledgeBlock";

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
          <KnowledgeBlock
            key={kb.knowledgeCheckBlockId}
            knowledgeCheckBlock={kb}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
