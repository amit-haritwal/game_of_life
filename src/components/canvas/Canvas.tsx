import { useEffect, useRef, useState } from 'react';
import { StyledCanvas } from './canvas.style';
import { Canvas } from './helpers';

function CanvasComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [context, set2DContext] = useState<CanvasRenderingContext2D | null>(
    null
  );
  const [grid, setGrid] = useState<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef) setCanvas(canvasRef?.current);
    if (canvasRef.current) set2DContext(canvasRef?.current?.getContext('2d'));
  }, [canvasRef]);

  useEffect(() => {
    window.addEventListener('mousedown', (e) => {
      if (e.x < 800 && e.y < 600 && grid) {
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

  function handleChangeSpeed(event: any) {
    if (grid) grid.setSpeed = (8000 / parseInt(event.target?.value)) as number;
  }

  return (
    <>
      <StyledCanvas width={800} height={600} ref={canvasRef}></StyledCanvas>
      <button onClick={animateGrid}>amimate</button>
      <button onClick={forwardgrid}>forward</button>
      <button onClick={stopAnimation}>stop</button>
      <button onClick={clearGrid}>clear</button>
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
    </>
  );
}

export default CanvasComponent;
