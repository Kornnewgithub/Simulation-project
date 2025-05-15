import React, { useRef, forwardRef, useImperativeHandle } from "react";
import HitterModel from "./HitterModel";

const HitterWrapper = forwardRef((props, ref) => {
  const groupRef = useRef();

  useImperativeHandle(ref, () => groupRef.current);

  return (
    <group
      ref={groupRef}
      position={[-2, -0.7, 0]}
      scale={[-0.0403, 0.0485, 0.0273]} // ขนาดจริงจาก blender
      rotation={[0, 4.7, 0]} // กลับด้านให้ไม้หันขวา
    >
      <HitterModel />
    </group>
  );
});

export default HitterWrapper;
