import React, { useEffect, useState, useCallback } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const refreshList = useCallback(async () => {
    try{
      const response = await api.get("/repositories/");
      
      setRepositories(response.data);
      console.log(repositories);
    }
    catch(err){
      console.log(err.response);
    }
  }, [repositories])
  
  useEffect(() => {
    api.get("repositories").then(response=>{
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {

    let newRepo = {
      title: "Teste2",
      url: "http://github.com/test",
      techs: ['ReactJS', 'NodeJS', 'React Native']
    }

    api.post('repositories', newRepo).then((response) => {
      setRepositories([...repositories, response.data]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      setRepositories(repositories.filter(repo=>repo.id != id));
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo=>(
          <li key={repo.id}>
            {repo.title}
            <button value={repo.id} onClick={() => handleRemoveRepository(repo.id)}>
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
