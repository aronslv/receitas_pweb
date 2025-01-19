'use client';

import { useState } from 'react';
import { searchMovies } from '../actions/movieActions'; 

export default function Home() {
  const [resultMovies, setResultMovies] = useState([]);
  const [titleSearchKey, setTitleSearchKey] = useState('');
  const [yearSearchKey, setYearSearchKey] = useState('');

  async function handleAction(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('titleSearchKey', titleSearchKey);
    formData.append('yearSearchKey', yearSearchKey);

    const res = await searchMovies(formData);
    
    if (res.Search) {
      setResultMovies(res.Search);
    } else {
      setResultMovies([]);
      alert(res.error || "Nenhum filme encontrado.");
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Busca de Filmes</h1>

      <form onSubmit={handleAction} style={{ marginBottom: "20px" }}>
        <label htmlFor="idTitleSearchKey">Título</label>
        <input
          id="idTitleSearchKey"
          name="titleSearchKey"
          value={titleSearchKey}
          onChange={(e) => setTitleSearchKey(e.target.value)}
          type="text"
          placeholder="Pesquise por título"
          style={{
            padding: "10px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <label htmlFor="idYearSearchKey">Ano</label>
        <input
          id="idYearSearchKey"
          name="yearSearchKey"
          value={yearSearchKey}
          onChange={(e) => setYearSearchKey(e.target.value)}
          type="text"
          placeholder="Ano (opcional)"
          style={{
            padding: "10px",
            width: "150px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginLeft: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            marginLeft: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Pesquisar
        </button>
      </form>

      <div>
        {resultMovies.length > 0 ? (
          resultMovies.map((filme) => (
            <div
              key={filme.imdbID}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <img
                src={
                  filme.Poster !== "N/A"
                    ? filme.Poster
                    : "https://via.placeholder.com/100x150"
                }
                alt={`Pôster de ${filme.Title}`}
                style={{ width: "100px", height: "150px", marginRight: "15px" }}
              />
              <div>
                <h3 style={{ margin: "0" }}>{filme.Title}</h3>
                <p style={{ margin: "0" }}>Ano: {filme.Year}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum filme encontrado. Tente pesquisar outra coisa.</p>
        )}
      </div>
    </div>
  );
}
