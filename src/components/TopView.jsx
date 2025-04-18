import React, { useRef, useEffect } from 'react';

export default function TopView() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = containerRef.current.clientWidth;
    const height = 250;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    // 📦 วาด Dropper 3 ส่วน (เรียงบนลงล่าง)
    const boxX = 40;
    const boxSize = 30;
    const spacing = 10;
    const totalHeight = boxSize * 3 + spacing * 2;
    const boxYStart = (height - totalHeight) / 2;

    const dropperColors = ['#4b9cd3', '#60a5fa', '#f87171'];
    dropperColors.forEach((color, i) => {
      const y = boxYStart + i * (boxSize + spacing);
      ctx.fillStyle = color;
      ctx.fillRect(boxX, y, boxSize, boxSize);
    });

    // 🌈 วาดโซนสนาม 5 สี
    const zoneColors = ['#90ee90', '#ffff99', '#ffd699', '#ff9999', '#dda0dd'];
    const paddingLeft = boxX + boxSize + 20;
    const paddingRight = 40;
    const zoneTotalWidth = width - paddingLeft - paddingRight;
    const zoneWidth = zoneTotalWidth / zoneColors.length;
    const zoneY = 10;
    const zoneHeight = height - 2 * zoneY;

    zoneColors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(paddingLeft + i * zoneWidth, zoneY, zoneWidth, zoneHeight);
    });
  }, []);

  return (
    <div ref={containerRef} className="bg-white dark:bg-gray-800 rounded shadow p-0">
      <canvas ref={canvasRef} />
    </div>
  );
}
