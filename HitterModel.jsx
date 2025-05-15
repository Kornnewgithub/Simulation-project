import React from "react";
import { useGLTF } from "@react-three/drei";

const HitterModel = (props) => {
  const model = useGLTF("/desktop_pc/Assemble.glb");
  return <primitive object={model.scene} {...props} />;
};

useGLTF.preload("/desktop_pc/Assemble.glb");

export default HitterModel;
