import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { themeDetails } from '../../redux/themereducer';
import { Patterns } from '../Constants';
import Controls from '../Controls';
import { AbsoluteDes, Pattern, StyledCanvas } from './canvas.style';
import { Canvas } from './helpers';
import i1 from '../images/1.png';
import i2 from '../images/2.png';
import i3 from '../images/3.png';
import i4 from '../images/4.png';
import i5 from '../images/5.png';

function CanvasComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [context, set2DContext] = useState<CanvasRenderingContext2D | null>(
    null
  );
  const dispatch = useAppDispatch();
  const [grid, setGrid] = useState<Canvas | null>(null);
  const [patternGrid, setPatternGrid] = useState<Array<Array<number>>>([
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [3, 2],
  ]);

  useEffect(() => {
    if (canvasRef) setCanvas(canvasRef?.current);
    if (canvasRef.current) set2DContext(canvasRef?.current?.getContext('2d'));
  }, [canvasRef]);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.x < 1440 && e.y < 640 && grid) {
        grid.changestate(e.x, e.y);
      }
    });
  }, [canvas, grid]);
  useEffect(() => {
    if (context) {
      const grid = new Canvas(context);
      grid.createGrid();
      setGrid(grid);
    }
  }, [context]);

  const animateGrid = () => {
    grid?.startAnimation();
  };

  const forwardgrid = () => {
    grid?.shuffelGrid();
  };

  const stopAnimation = () => {
    grid?.stopAnimation();
  };

  const clearGrid = () => {
    if (context) {
      const grid = new Canvas(context);
      grid.createGrid();
      setGrid(grid);
    }
  };
  const setPattern = async (index: number) => {
    await grid?.stopAnimation();
    dispatch(
      themeDetails({
        state: false,
      })
    );
    grid?.makeSomePattern(Patterns[index]);
  };
  function handleChangeSpeed(event: any) {
    if (grid) grid.setSpeed = (8000 / parseInt(event.target?.value)) as number;
  }

  return (
    <>
      <StyledCanvas width={1440} height={640} ref={canvasRef}></StyledCanvas>
      <AbsoluteDes>
        <Pattern
          src={i1}
          onClick={() => {
            setPattern(0);
          }}
        />
        <Pattern
          src={i2}
          onClick={() => {
            setPattern(1);
          }}
        />
        <Pattern
          src={i3}
          onClick={() => {
            setPattern(2);
          }}
        />
        <Pattern
          src={i4}
          onClick={() => {
            setPattern(3);
          }}
        />
        <Pattern
          src={i5}
          onClick={() => {
            setPattern(4);
          }}
        />
      </AbsoluteDes>
      <Controls
        handleChangeSpeed={handleChangeSpeed}
        startAnimation={animateGrid}
        clearGrid={clearGrid}
        stopAnimation={stopAnimation}
        forwardGrid={forwardgrid}
      />
    </>
  );
}

export default CanvasComponent;
