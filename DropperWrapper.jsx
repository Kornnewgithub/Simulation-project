import React, { useRef, forwardRef, useImperativeHandle } from "react";
import DropperModel from "./DropperModel";

const DropperWrapper = forwardRef((props, ref) => {
  const groupRef = useRef();

  useImperativeHandle(ref, () => groupRef.current);

  return (
    <group
      ref={groupRef}
      position={[-2.75, -0.3, 0]}
      scale={[-0.9, 0.7, 0.9]} // ขนาดสมมติที่ใกล้เคียง
      rotation={[0, 7.85, 0]} // กลับหน้าเข้าหาสนาม
    >
      <DropperModel />
    </group>
  );
});

export default DropperWrapper;
