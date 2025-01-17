class Botao extends React.Component {
  render() {
    return (
      <button style={this.props.style} onClick={this.props.onClick}>
        {this.props.texto}
      </button>
    );
  }
}

class Mensagem extends React.Component {
  render() {
    return <p style={{ textAlign: "center" }}>{this.props.texto}</p>;
  }
}

class TabelaBebidas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bebidas: [],
      tabelaVisivel: false,
    };
  }

  carregarBebidas = () => {
    const bebidas = [
      { name: "Heineken", ibu: 23, type: "Cerveja" },
      { name: "Jack Daniel's", ibu: "-", type: "Whisky" },
      { name: "Grey Goose", ibu: "-", type: "Vodka" },
      { name: "Guinness", ibu: 45, type: "Cerveja" },
    ];
    this.setState((prevState) => ({
      bebidas: bebidas,
      tabelaVisivel: !prevState.tabelaVisivel,
    }));
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>{this.props.titulo}</h1>
        <Botao
          style={{
            display: "block",
            margin: "20px auto",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          texto={this.state.tabelaVisivel ? "Ocultar Bebidas" : "Carregar Bebidas"}
          onClick={this.carregarBebidas}
        />
        {this.state.tabelaVisivel && (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>IBU</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {this.state.bebidas.map((bebida, index) => (
                <tr key={index}>
                  <td>{bebida.name}</td>
                  <td>{bebida.ibu}</td>
                  <td>{bebida.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Mensagem
          texto={
            this.state.tabelaVisivel
              ? "Tabela carregada com sucesso!"
              : "Clique no botão para carregar a tabela."
          }
        />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <TabelaBebidas titulo="Tabela de Bebidas" />
        <TabelaBebidas titulo="Tabela de Cana" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
