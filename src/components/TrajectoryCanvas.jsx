import React, { useRef, useEffect } from 'react';

export default function TrajectoryCanvas({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const canvasWidth = 1000;
    const canvasHeight = 500;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const scaleX = 300; // หน่วย: px ต่อเมตร
    const scaleY = 100;

    // ===== พื้นสนาม =====
    const groundHeight = 60;
    const groundY = canvasHeight - groundHeight;
    ctx.fillStyle = '#333';
    ctx.fillRect(0, groundY, canvasWidth, groundHeight);

    // ===== โซนเป้าหมาย =====
    const targetZones = [
      { start: 0.75, end: 1.13, color: '#9be7a6' },
      { start: 1.13, end: 1.51, color: '#fff59d' },
      { start: 1.51, end: 1.89, color: '#ffcc80' },
      { start: 1.89, end: 2.27, color: '#ef9a9a' },
      { start: 2.27, end: 2.65, color: '#ce93d8' },
    ];

    targetZones.forEach(({ start, end, color }) => {
      const zoneX = start * scaleX;
      const zoneWidth = (end - start) * scaleX;
      ctx.fillStyle = color;
      ctx.fillRect(zoneX, groundY, zoneWidth, groundHeight);
    });

    // ===== เส้นแบ่งโซน =====
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    targetZones.forEach(({ start }) => {
      const x = start * scaleX;
      ctx.beginPath();
      ctx.moveTo(x, groundY);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
    });

    // ===== เส้นกราฟการเคลื่อนที่ =====
    ctx.beginPath();
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 2;

    data.forEach(({ x, y }, i) => {
      const px = x * scaleX;
      const py = canvasHeight - y * scaleY;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });

    ctx.stroke();
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      className="rounded shadow"
      style={{
        background: '#cce6ff', // ฟ้าอ่อนแบบ PHET
        display: 'block',
      }}
    />
  );
}
