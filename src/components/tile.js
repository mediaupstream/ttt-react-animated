import React from 'react';
import styled, {keyframes} from 'styled-components';
import { zoomOut, headShake, rubberBand } from 'react-animations';

const EmptyTile = styled.div`
  font-weight:100;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, sans-serif;
  color: ${props => props.v === 'O'
    ? 'var(--color-primary)'
    : 'var(--color-highlight)'};
  font-size: 5rem;
`;
const PlayerTile = EmptyTile.extend`
`;

const PlayerFade = PlayerTile.extend`
  transform: rotate(-180deg);
  animation: 1s ${keyframes`${zoomOut}`};
  animation-delay: ${props => props.delay}s;
`;

const PlayerWinner = PlayerTile.extend`
  animation: 1s ${keyframes`${rubberBand}`};
`;

const PlayerDraw = PlayerTile.extend`
  animation: 1s ${keyframes`${headShake}`};
`;

const Box = styled.div`
  position:relative;
  text-align: center;
  vertical-align: middle;
  width: 160px;
  padding: 70px 0;
  border-right: 2px solid var(--color-dark);
  border-bottom: 2px solid var(--color-dark);
  cursor: pointer;
  line-height:0px;
  &:last-child {
    border-right: 0px;
  }
  &:hover ${EmptyTile}:before {
    content: "${props => props.v}";
    font-family: "Gill Sans", "Gill Sans MT", Calibri, sans-serif;
    display:block;
    pointer-events:none;
    position:relative;
    text-align:center;
    vertical-align:center;
    font-size:5rem;
    color:#546363;
    font-weight:100;
    opacity:0.5;
  }
`;

const T = ({fadeOut, draw, winner, gameOver, active}) => {
  let P = active ? PlayerTile : EmptyTile;
  if (gameOver) P = PlayerTile;
  if (winner) P = PlayerWinner;
  if (draw) P = PlayerDraw;
  if (fadeOut) P = PlayerFade;
  return P
}

const Tile = ({id, active, fadeOut, nextPlayer, draw, winner, gameOver, handleClick}) => {
  const P = T({fadeOut, draw, winner, active, gameOver});
  return (<Box v={nextPlayer} onClick={() => handleClick(id)}>
            <P v={active} delay={id*0.05}>{ active }</P>
          </Box>);
}

export default Tile;
