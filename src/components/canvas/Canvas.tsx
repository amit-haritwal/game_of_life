import { useRef } from "react";
import { StyledCanvas } from "./canvas.style";

function Canvas() {
  const canvasRef = useRef(null);
  return <StyledCanvas  width={800} height={600} ref={canvasRef}></StyledCanvas>;
}

export default Canvas;
