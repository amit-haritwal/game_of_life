import ClearIcon from '../icons/clearIcon';
import ForwardIcon from '../icons/forwardIcon';
import PlayIcon from '../icons/play';
import StopIcon from '../icons/stopIcon';
import { StyledControlsContainer } from './controls.style';

function Controls({
  handleChangeSpeed,
  startAnimation,
  clearGrid,
  stopAnimation,
  forwardGrid,
}: any) {
  return (
    <StyledControlsContainer>
      <div>
        <div>
          <label htmlFor="speed">Speed</label>
          <input
            type="range"
            min={1}
            max={200}
            onChange={handleChangeSpeed}
            defaultValue={40}
            id="speed"
          />
        </div>
      </div>
      <div className="play_icon" onClick={startAnimation}>
        <PlayIcon />
      </div>
      <div className="clear_grid" onClick={clearGrid}>
        <ClearIcon />
      </div>
      <div className="stop" onClick={stopAnimation}>
        <StopIcon />
      </div>
      <div className="forward" onClick={forwardGrid}>
        <ForwardIcon />
      </div>
    </StyledControlsContainer>
  );
}
export default Controls;
