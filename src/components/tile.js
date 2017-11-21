import React from 'react';
import styled, {keyframes} from 'styled-components';
import { zoomOut, shake, rubberBand } from 'react-animations';

const EmptyTile = styled.div`
  font-family: ${props => props.v === 'O'
    ? 'Futura, "Trebuchet MS", Arial, sans-serif'
    : '"Gill Sans", "Gill Sans MT", Calibri, sans-serif'};
  color: ${props => props.v === 'O'
    ? 'var(--color-primary)'
    : 'var(--color-highlight)'};
  font-size: 4rem;
`;
const PlayerTile = styled.div`
  font-family: ${props => props.v === 'O'
    ? 'Futura, "Trebuchet MS", Arial, sans-serif'
    : '"Gill Sans", "Gill Sans MT", Calibri, sans-serif'};
  color: ${props => props.v === 'O'
    ? 'var(--color-primary)'
    : 'var(--color-highlight)'};
  font-size: 4rem;
`;

const PlayerFade = PlayerTile.extend`
  animation: 1s ${keyframes`${zoomOut}`};
`;

const PlayerWinner = PlayerTile.extend`
  animation: 1s ${keyframes`${rubberBand}`};
`;

const PlayerDraw = PlayerTile.extend`
  animation: 1s ${keyframes`${shake}`};
`;

const Box = styled.div`
  position:relative;
  text-align: center;
  vertical-align: middle;
  width: 160px;
  padding: 70px 0;
  border: 1px solid var(--color-secondary);
  cursor: pointer;
  line-height:0px;
  &:hover ${EmptyTile}:before {
    content: "${props => props.v}";
    font-family: ${props => props.v === 'O'
      ? 'Futura, "Trebuchet MS", Arial, sans-serif'
      : '"Gill Sans", "Gill Sans MT", Calibri, sans-serif'};
    display:block;
    pointer-events:none;
    position:relative;
    text-align:center;
    vertical-align:center;
    font-size:4rem;
    color:#546363;
    opacity:0.5;
  }
`;

const T = ({fadeOut, draw, winner, active}) => {
  let P = active ? PlayerTile : EmptyTile;
  if (winner) P = PlayerWinner;
  if (draw) P = PlayerDraw;
  if (fadeOut) P = PlayerFade;
  return P
}

const Tile = ({id, active, fadeOut, nextPlayer, draw, winner, handleClick}) => {
  const P = T({fadeOut, draw, winner, active});
  return (<Box v={nextPlayer} onClick={() => handleClick(id)}>
            <P v={active}>{ active }</P>
          </Box>);
}

export default Tile;
