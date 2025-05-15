import React from "react";
import { useGLTF } from "@react-three/drei";

const DropperModel = (props) => {
  const { scene } = useGLTF("/desktop_pc/main_assembly.glb");
  return <primitive object={scene} {...props} />;
};

useGLTF.preload("/desktop_pc/main_assembly.glb");

export default DropperModel;
