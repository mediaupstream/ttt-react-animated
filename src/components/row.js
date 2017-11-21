import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  justify-content: center;
  &:last-child div {
    border-bottom: 0px;
  }
`;

export default Row;
