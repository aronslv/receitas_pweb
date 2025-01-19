"use client";

import React, { useState, useCallback, memo } from "react";

const MovieForm = memo(({ onSubmit, pesquisa, setPesquisa, carregando }) => {
  console.log("Formulário renderizado");

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mb-6">
      <label htmlFor="idTitleSearchKey" className="text-lg font-bold">
        Título
      </label>
      <input
        id="idTitleSearchKey"
        name="titleSearchKey"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        placeholder="Pesquise um filme..."
        className="p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        disabled={carregando}
        className={`p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
          carregando ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {carregando ? "Carregando..." : "Pesquisar"}
      </button>
    </form>
  );
});

const MovieTable = ({ filmes }) => {
  console.log("Tabela renderizada");

  return (
    <div>
      {filmes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filmes.map((filme) => (
            <div
              key={filme.imdbID}
              className="flex flex-col items-center border p-4 rounded-md shadow-md"
            >
              <img
                src={
                  filme.Poster !== "N/A"
                    ? filme.Poster
                    : "https://via.placeholder.com/100x150"
                }
                alt={`Pôster de ${filme.Title}`}
                className="w-40 h-60 mb-2"
              />
              <h3 className="text-lg font-bold">{filme.Title}</h3>
              <p className="text-gray-600">Ano: {filme.Year}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Nenhum filme encontrado. Tente novamente.</p>
      )}
    </div>
  );
};

export default function Home() {
  const [pesquisa, setPesquisa] = useState("");
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const buscarFilmes = async (termoDePesquisa) => {
    setCarregando(true);
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=a75302ac&s=${termoDePesquisa}`
      );
      const dados = await res.json();
      if (dados.Response === "True") {
        setFilmes(dados.Search);
      } else {
        setFilmes([]);
        alert(dados.Error);
      }
    } catch (erro) {
      console.error("Erro ao buscar filmes:", erro);
      alert("Falha ao buscar filmes. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  };

  const realizarPesquisa = useCallback(
    (e) => {
      e.preventDefault();
      if (pesquisa.trim()) {
        buscarFilmes(pesquisa);
        setPesquisa("");
      } else {
        alert("Digite um termo para pesquisar.");
      }
    },
    [pesquisa]
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Busca de Filmes</h1>
      <MovieForm
        onSubmit={realizarPesquisa}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        carregando={carregando}
      />
      <MovieTable filmes={filmes} />
    </div>
  );
}
