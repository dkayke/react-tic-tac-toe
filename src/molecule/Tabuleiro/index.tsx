import React from "react";
import Campo from "../../atom/Campo";

interface IProps {}

interface IState {
  campos: string[];
  xIsNext: boolean;
}

class Tabuleiro extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      campos: Array(9).fill(null),
      xIsNext: true
    };
  }

  renderCampo(i: any) {
    i = i.toString();
    return (
      <Campo value={this.state.campos[i]} onClick={() => this.handleClick(i)} />
    );
  }

  handleClick(i: any) {
    const campos = this.state.campos.slice();
    if (this.verificaVencedor(campos) || campos[i]) {
      return;
    }
    campos[i] = this.verificarVez(this.state.xIsNext);
    this.setState({
      campos: campos,
      xIsNext: !this.state.xIsNext
    });
  }

  verificarVez(xIsNext: boolean) {
    return xIsNext ? "X" : "O";
  }

  verificaVencedor(campos: any[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (campos[a] && campos[a] === campos[b] && campos[a] === campos[c]) {
        return campos[a] + " venceu!";
      }
    }

    for (let i = 0; i < campos.length; i++) {
      if (campos[i] === null) {
        return null;
      }
    }
    return "Empate";
  }

  render() {
    return (
      <div className="tabuleiro">
        {this.verificaVencedor(this.state.campos) ? (
          <div>{this.verificaVencedor(this.state.campos)}</div>
        ) : (
          <div>Vez: {this.verificarVez(this.state.xIsNext)}</div>
        )}
        <div className="tabuleiro-linha">
          <div className="tabuleiro-campos">
            {this.renderCampo(0)}
            {this.renderCampo(1)}
            {this.renderCampo(2)}
          </div>
          <div className="tabuleiro-campos">
            {this.renderCampo(3)}
            {this.renderCampo(4)}
            {this.renderCampo(5)}
          </div>
          <div className="tabuleiro-campos">
            {this.renderCampo(6)}
            {this.renderCampo(7)}
            {this.renderCampo(8)}
          </div>
        <div className="tabuleiro-campos">
          <button className="reiniciar" onClick={ () => this.setState({ campos: Array(9).fill(null) }) }>
            Reiniciar jogo
          </button>
        </div>
        </div>
      </div>
    );
  }
}

export default Tabuleiro;
