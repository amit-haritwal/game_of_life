import styled from 'styled-components';

export const StyledCanvas = styled.canvas`
  background-color: red;
`;

export const AbsoluteDes = styled.div`
  width: 100%;
  height: 104px;
  display: flex;
  justify-content: space-evenly;
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

export const GenerationStyle = styled.div`
  font-size: 1.5rem;
  color: black;
`;

export const SuccessMessage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CrossIcon = styled.button`
  background-color: rgb(0 77 184);
  outline: none;
  border: none;
  padding: 1rem;
  font-size: 1.2rem;
  width: 8rem;
`;

export const SuccessMessageInner = styled.div`
  width: 20rem;
  height: 20rem;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 2rem;
  & > div {
    width: 15rem;
    font-size: 1.2rem;
    text-align: center;
  }
`;
