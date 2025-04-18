import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';

const SideView = forwardRef(({ trajectory }, ref) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const isStopped = useRef(false);

  // ปุ่ม stop จะเรียกฟังก์ชันนี้
  useImperativeHandle(ref, () => ({
    stopAnimation: () => {
      isStopped.current = true;
      cancelAnimationFrame(animationRef.current);
    },
  }));

  useEffect(() => {
    if (!trajectory?.freefall || !trajectory?.projectile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = containerRef.current.clientWidth;
    const height = 250;
    canvas.width = width;
    canvas.height = height;

    // config layout
    const boxX = 40;
    const boxSize = 30;
    const zoneY = 220;
    const zoneHeight = 6;
    const dropperY = zoneY - boxSize;

    const zoneColors = ['#90ee90', '#ffff99', '#ffd699', '#ff9999', '#dda0dd'];
    const zonePaddingLeft = boxX + boxSize + 20;
    const zonePaddingRight = 40;
    const zoneWidthTotal = width - zonePaddingLeft - zonePaddingRight;
    const zoneWidth = zoneWidthTotal / zoneColors.length;

    const scaleX = 60;
    const scaleY = 60;
    const originX = zonePaddingLeft;
    const originY = zoneY;

    const fullTrajectory = [...trajectory.freefall, ...trajectory.projectile];
    const points = fullTrajectory.map((pt, i) => ({
      ...pt,
      t: i * 0.02,
    }));
    const totalTime = points[points.length - 1].t;

    // วาดฉากพื้นฐาน (สนาม + เครื่อง)
    const drawField = () => {
      ctx.clearRect(0, 0, width, height);

      // dropper ซ้อนสี
      ['#4b9cd3', '#60a5fa', '#f87171'].forEach((color) => {
        ctx.fillStyle = color;
        ctx.fillRect(boxX, dropperY, boxSize, boxSize);
      });

      // สนามแบ่งโซน
      zoneColors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(
          zonePaddingLeft + i * zoneWidth,
          zoneY,
          zoneWidth,
          zoneHeight
        );
      });
    };

    // ฟังก์ชัน animate โดยใช้ requestAnimationFrame + timestamp
    const animate = (startTime) => {
      if (isStopped.current) return;

      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      drawField();

      // วาดกราฟ
      ctx.beginPath();
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;

      const visible = points.filter((pt) => pt.t <= elapsed);
      visible.forEach((pt, i) => {
        const x = originX + pt.x * scaleX;
        const y = originY - pt.y * scaleY;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // วาดลูกบอล
      const currentPt = points.find((pt) => pt.t >= elapsed) || points.at(-1);
      const ballX = originX + currentPt.x * scaleX;
      const ballY = originY - currentPt.y * scaleY;

      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.arc(ballX, ballY, 5, 0, Math.PI * 2);
      ctx.fill();

      if (elapsed < totalTime) {
        animationRef.current = requestAnimationFrame((ts) => animate(startTime));
      }
    };

    drawField();
    isStopped.current = false;
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame((ts) => animate(ts));

    return () => cancelAnimationFrame(animationRef.current);
  }, [trajectory]);

  return (
    <div ref={containerRef} className="bg-white rounded shadow p-0">
      <canvas ref={canvasRef} />
    </div>
  );
});

export default SideView;
