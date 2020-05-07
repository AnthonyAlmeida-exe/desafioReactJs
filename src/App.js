import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Desafio Node.js ${new Date()}`,
      url: "http://github.com/...",
      techs: ["Node.js", "..."],
      likes: 0,
    });
    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    repositories.splice(
      repositories.findIndex((repository) => repository.id === id),
      1
    );
    const response = await api.delete(`/repositories/${id}`);
    const teste = repositories;
    console.log(teste);
    setRepositories([...teste]);
  }
  useEffect(() => {
    api.get("/repositories").then((res) => {
      setRepositories(res.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
