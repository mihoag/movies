import { useEffect, useRef } from 'react';

interface DataPoint {
  genre: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: DataPoint[];
}

export function PieChart({ data }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const size = 180;
    canvasRef.current.width = size * dpr;
    canvasRef.current.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Calculate total for percentages
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Draw pie chart
    let currentAngle = -0.5 * Math.PI; // Start at top

    data.forEach(({ value, color }) => {
      const sliceAngle = (value / total) * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(size / 2, size / 2);
      ctx.arc(size / 2, size / 2, size / 2, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();

      currentAngle += sliceAngle;
    });
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100px',
        height: '100px',
      }}
    />
  );
}
