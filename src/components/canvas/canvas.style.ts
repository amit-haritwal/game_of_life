import styled from 'styled-components';

export const StyledCanvas = styled.canvas`
  background-color: #2e2e2e;
`;

export const AbsoluteDes = styled.div`
  width: 100%;
  height: 104px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const Pattern = styled.img`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  box-shadow: 0px 0px 2px 2px #b1b1b1;
  &:hover {
    box-shadow: 1px 1px 4px 2px #b1b1b1;
  }
`;
