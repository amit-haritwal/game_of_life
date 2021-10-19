import styled from 'styled-components';

export const StyledControlsContainer = styled.div`
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: whitesmoke;
  box-shadow: 1px 1px 4px 2px #b1b1b1;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
  }
  & > .play_icon {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border-radius: 50%;
    transition: all 0.4s ease;
    box-shadow: 0px 0px 2px 2px #b1b1b1;

    &:hover {
      box-shadow: 1px 1px 4px 2px #b1b1b1;
    }

    background-color: white;
    height: 3rem;
    width: 3rem;
    border: 1px solid gray;
  }
`;
