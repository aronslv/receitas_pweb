"use client";

import React, { useState } from 'react';

export default function Home() {
  const [pesquisa, setPesquisa] = useState('');
  const [filmes, setFilmes] = useState([]);

  const buscarFilmes = async (termoDePesquisa) => {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=a75302ac&s=${termoDePesquisa}`
      );
      const dados = await res.json();
      if (dados.Response === 'True') {
        setFilmes(dados.Search);
      } else {
        setFilmes([]);
        alert(dados.Error);
      }
    } catch (erro) {
      console.error('Erro ao buscar filmes:', erro);
      alert('Falha ao buscar filmes. Tente novamente mais tarde.');
    }
  };

  const realizarPesquisa = (e) => {
    e.preventDefault();
    if (pesquisa.trim()) {
      buscarFilmes(pesquisa);
    } else {
      alert('Digite um termo para pesquisar');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Busca de Filmes</h1>
      <form onSubmit={realizarPesquisa} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          placeholder="Pesquise um filme..."
          style={{
            padding: '10px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 15px',
            marginLeft: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Pesquisar
        </button>
      </form>

      <div>
        {filmes.length > 0 ? (
          filmes.map((filme) => (
            <div
              key={filme.imdbID}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
              }}
            >
              <img
                src={filme.Poster !== 'N/A' ? filme.Poster : 'https://via.placeholder.com/100x150'}
                alt={`Pôster de ${filme.Title}`}
                style={{ width: '100px', height: '150px', marginRight: '15px' }}
              />
              <div>
                <h3 style={{ margin: '0' }}>{filme.Title}</h3>
                <p style={{ margin: '0' }}>Ano: {filme.Year}</p>
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
