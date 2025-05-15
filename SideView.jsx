import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HitterWrapper from "./HitterWrapper";
import DropperWrapper from "./DropperWrapper";

const SideView = ({ cadMode, hitterRef, dropperRef, activeTarget }) => {
  const isDragging = useRef(false);
  const lastMouse = useRef([0, 0]);

  const ZOOM = 200;
  const SCALE = 1 / ZOOM;

  const handlePointerDown = (e) => {
    if (e.button === 0) {
      isDragging.current = true;
      lastMouse.current = [e.clientX, e.clientY];
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const dx = (e.clientX - lastMouse.current[0]) * SCALE;
    const dy = (e.clientY - lastMouse.current[1]) * SCALE;
    lastMouse.current = [e.clientX, e.clientY];

    const FIELD_WIDTH = 5.3;
    const FIELD_HEIGHT = 2.0;
    const CAD_WIDTH = 0.5;
    const CAD_HEIGHT = 0.5;

    const HALF_FIELD_WIDTH = FIELD_WIDTH / 2;
    const HALF_FIELD_HEIGHT = FIELD_HEIGHT / 2;

    const ref = activeTarget === "hitter" ? hitterRef.current : dropperRef.current;
    if (!ref) return;

    if (cadMode === "move") {
      let newX = ref.position.x + dx;
      let newY = ref.position.y - dy;
      newX = Math.max(-HALF_FIELD_WIDTH + CAD_WIDTH / 2, Math.min(newX, HALF_FIELD_WIDTH - CAD_WIDTH / 2));
      newY = Math.max(-HALF_FIELD_HEIGHT + CAD_HEIGHT / 2, Math.min(newY, HALF_FIELD_HEIGHT - CAD_HEIGHT / 2));
      ref.position.x = newX;
      ref.position.y = newY;
    } else if (cadMode === "rotate") {
      ref.rotation.y += dx;
    }
  };

  return (
    <div
      className="relative bg-black rounded border border-gray-700"
      style={{ width: "1060px", height: "400px" }}
    >
      <img
        src="/desktop_pc/field.png"
        alt="Side View Field"
        className="absolute bottom-0 left-0 w-[1060px] h-[70px] object-fill pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <Canvas
        orthographic
        camera={{
          zoom: ZOOM,
          position: [0, 1, 10],
          up: [0, 1, 0],
          near: 0.1,
          far: 1000
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1060px",
          height: "400px",
          zIndex: 2,
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} />

        <HitterWrapper ref={hitterRef} />
        <DropperWrapper ref={dropperRef} />

        <OrbitControls enabled={false} />
      </Canvas>
    </div>
  );
};

export default SideView;
