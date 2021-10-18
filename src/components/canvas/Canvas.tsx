import { useEffect, useRef, useState } from "react";
import { StyledCanvas } from "./canvas.style";
import { Canvas } from "./helpers";

function CanvasComponent() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
	const [context, set2DContext] = useState<CanvasRenderingContext2D | null>(
		null
	);
	const [grid, setGrid] = useState<Canvas | null>(null);
	const [timeoutValue, setTimeout] = useState<NodeJS.Timer | null>(null);
	useEffect(() => {
		if (canvasRef) setCanvas(canvasRef?.current);
		if (canvasRef.current) set2DContext(canvasRef?.current?.getContext("2d"));
	}, [canvasRef]);
	useEffect(() => {
		window.addEventListener("mousedown", (e) => {
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
	const animategrid = () => {
		if (timeoutValue === null) {
			const timeout: NodeJS.Timer = setInterval(function () {
				grid?.shuffelGrid();
			}, 100);
			setTimeout(timeout);
		}
	};
	const forwardgrid = () => {
		grid?.shuffelGrid();
	};
	const stopanimation = () => {
		if (timeoutValue) {
			window.clearInterval(timeoutValue);
			setTimeout(null);
		}
	};
	const clearGrid = () => {
		if (context) {
			const grid = new Canvas(context);
			grid.createGrid();
			setGrid(grid);
		}
	};
	return (
		<>
			<StyledCanvas width={800} height={600} ref={canvasRef}></StyledCanvas>
			<button onClick={animategrid}>amimate</button>
			<button onClick={forwardgrid}>forward</button>
			<button onClick={stopanimation}>stop</button>
			<button onClick={clearGrid}>clear</button>
			{timeoutValue}
		</>
	);
}

export default CanvasComponent;