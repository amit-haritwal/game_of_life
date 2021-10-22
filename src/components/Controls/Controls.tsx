import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import ClearIcon from '../icons/clearIcon';
import ForwardIcon from '../icons/forwardIcon';
import PlayIcon from '../icons/play';
import StopIcon from '../icons/stopIcon';
import { StyledControlsContainer } from './controls.style';

const Controls = (props: IControlProps) => {
  const [isAnimationRunning, setisAnimationRunning] = useState(false);

  return (
    <StyledControlsContainer>
      <div>
        <div>
          <label htmlFor="speed">Speed</label>
          <input
            type="range"
            min={1}
            max={200}
            onChange={props.handleChangeSpeed}
            defaultValue={40}
            id="speed"
          />
        </div>
      </div>
      {!isAnimationRunning ? (
        <div
          className="play_icon"
          onClick={() => {
            setisAnimationRunning(true);
            props.startAnimation();
          }}
        >
          <PlayIcon />
        </div>
      ) : (
        <div
          className="stop"
          onClick={() => {
            setisAnimationRunning(false);
            props.stopAnimation();
          }}
        >
          <StopIcon />
        </div>
      )}

      {!isAnimationRunning && (
        <>
          <div className="clear_grid" onClick={props.clearGrid}>
            <ClearIcon />
          </div>

          <div className="forward" onClick={props.forwardGrid}>
            <ForwardIcon />
          </div>
        </>
      )}
    </StyledControlsContainer>
  );
};
export default Controls;

interface IControlProps {
  handleChangeSpeed: ChangeEventHandler<HTMLInputElement>;
  startAnimation: Function;
  clearGrid: MouseEventHandler<HTMLDivElement>;
  stopAnimation: Function;
  forwardGrid: MouseEventHandler<HTMLDivElement>;
}
