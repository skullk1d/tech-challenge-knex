import React, { useEffect, useState } from "react";

import logoRise360 from "./logo-rise-360.svg";
import logoRiseCom from "./logo-rise-com.svg";
import "./App.css";
import AsyncImage from "./components/AsyncImage";

import type { Media } from "@server/api";

function App() {
  const [knowledgeMedia, setKnowledgeMedia] = useState<Array<Media>>([]);

  useEffect(() => {
    fetch("http://localhost:5001/media").then(async (res) => {
      const data = await res.json();

      setKnowledgeMedia(data);
    });
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
        <AsyncImage url={knowledgeMedia[0]?.url ?? ""} />
      </section>
    </div>
  );
}

export default App;
