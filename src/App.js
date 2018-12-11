import React, { Component } from 'react';
import styled, {keyframes} from 'styled-components';
import { fadeInDown, fadeInUp, fadeOutUp, flipInY, flipOutY } from 'react-animations';
import Tile from './components/tile';
import Row from './components/row';
import Board from './components/board';

const Header = styled.div`
  display: flex;
  width:480px;
  margin-left:auto;
  margin-right:auto;
  // background-color: #fff;
`;

const Title = styled.h1`
  animation: 0.7s ${keyframes`${fadeInUp}`};
  flex: 1 1 auto;
  font-weight:200;
  width:320px;
`;
const Draw = styled.h1`
  margin-left:auto;
  margin-right:auto;
  flex: 1 1 auto;
  font-weight:200;
  width:320px;
`;
const DrawIn = Draw.extend`
  animation: 1s ${keyframes`${flipInY}`};
`;
const DrawOut = Draw.extend`
  animation: 1s ${keyframes`${flipOutY}`};
`;

const Winner = styled.h1`
  color: ${props => props.v === 'O'
    ? 'var(--color-primary)'
    : 'var(--color-highlight)'};
  flex: 1 1 auto;
  font-weight:200;
  width:320px;
`;
const WinnerIn = Winner.extend`
  animation: 0.7s ${keyframes`${fadeInDown}`};
`;
const WinnerOut = Winner.extend`
  animation: 0.7s ${keyframes`${fadeOutUp}`};
`;

const Button = styled.span`
  font-size:1rem;
  // border:2px solid var(--color-highlight);
  color: var(--color-dark);
  cursor:pointer;
  flex: 1 1 auto;
  width:80px;
  vertical-align:middle;
  line-height:5rem;
`;

const defaultState = {
  tiles: [
    null,null,null,
    null,null,null,
    null,null,null
  ],
  restart: false,
  moves: 0,
  gameOver: null
}

const updateTile = (id, value) => {
  return state => {
    let tiles = Object.assign({}, state.tiles)
    if (tiles[id]) return;
    tiles[id] = value;
    return {
      tiles: tiles,
      moves: state.moves + 1,
      gameOver: isGameOver(tiles)
    }
  }
}

const resetBg = () => {
  document.body.classList.remove('p1', 'p2')
}

const isGameOver = tiles => {
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
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return [a,b,c]
    }
  }
  return null;
}

class App extends Component {

  state = {
    ...defaultState
  }

  restart = () => {
    this.setState({restart: true})
    resetBg()
    setTimeout(() => {
      this.setState(defaultState);
    }, 700)
  }

  gameIsOver = (winner, moves) => {
    if (winner) {
      let player = this.state.tiles[winner[0]]
      let W = (this.state.restart) ? WinnerOut : WinnerIn;
      return (
        <W v={player}>
          Player <strong>{player}</strong> wins!
        </W>
      );
    } else if (moves > 8) {
      setTimeout(resetBg, 650)
      let D = (this.state.restart) ? DrawOut : DrawIn;
      return (
        <D>
          Draw!
        </D>
      );
    }
    return <Title>Tic Tac Toe</Title>;
  }

  handleClick = id => {
    if (this.state.gameOver) return
    const b = document.body.classList
    const p = this.state.moves % 2 ? 'O': 'X'
    const s = updateTile(id, p)(this.state)
    if (!s) return
    this.setState(s, () => {
      if (this.state.gameOver) {
        resetBg()
        b.add( p == 'X' ? 'p1' : 'p2')
        return
      }
      if (p == 'X') {
        b.add('p2')
        b.remove('p1')
      } else {
        b.add('p1')
        b.remove('p2')
      }
    })
  }

  makeTile = id => {
    let active = this.state.tiles[id];
    let gameOver = this.state.gameOver ? true : false;
    let winner = (
      this.state.gameOver &&
      this.state.gameOver.indexOf(id) !== -1
    ) ? true : false;
    let draw = (!this.state.gameOver && this.state.moves > 8)
      ? true : false;
    let next = (this.state.moves % 2) ? 'O': 'X';
    return <Tile
      key={id}
      id={id}
      active={active}
      fadeOut={this.state.restart}
      nextPlayer={next}
      draw={draw}
      gameOver={gameOver}
      winner={winner}
      handleClick={id => this.handleClick(id)}
      />
  }

  makeRow = tiles => {
    return <Row>{tiles.map(this.makeTile)}</Row>;
  }


  render = () => {
    return (
      <div>
        <Header>
          <Button>{this.state.moves} moves</Button>
          {this.gameIsOver(this.state.gameOver, this.state.moves)}
          <Button onClick={this.restart}>Restart</Button>
        </Header>
        <Board>
          { this.makeRow([0,1,2]) }
          { this.makeRow([3,4,5]) }
          { this.makeRow([6,7,8]) }
        </Board>
        <div id="footer">
          Created by <a href="http://mediaupstream.com">@derekanderson</a>
          <span> | </span>
          Source on <a href="https://github.com/mediaupstream/ttt-react-animated">Github.com</a>
        </div>
      </div>
    );
  }
}

export default App;
