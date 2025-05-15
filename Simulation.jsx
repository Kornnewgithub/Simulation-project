import React, { useState, useRef } from "react";
import SideView from "./SideView";
import TopView from "./TopView";
import ParameterBox from "./ParameterBox";

const Simulation = () => {
  const [cadMode, setCadMode] = useState("none");
  const [activeTarget, setActiveTarget] = useState("hitter");
  const [x, setX] = useState("1.5");
  const [y, setY] = useState("0");

  const hitterRef = useRef();
  const dropperRef = useRef();

  const handleResetCAD = () => {
    const current = activeTarget === "hitter" ? hitterRef.current : dropperRef.current;
    if (current) {
      current.position.set(0, 0, 0);
      current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-[#0f0f0f] text-white">
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="text-xl font-bold mb-2">Side View</div>
        <SideView
          cadMode={cadMode}
          hitterRef={hitterRef}
          dropperRef={dropperRef}
          activeTarget={activeTarget}
        />
        <div className="text-xl font-bold mt-6 mb-2">Top View</div>
        <TopView />
      </div>
      <div className="w-[350px] mt-16 px-4 pb-6 bg-[#1a1a1a] border-l border-gray-700">
        <ParameterBox
          mode={cadMode}
          setMode={setCadMode}
          onResetCAD={handleResetCAD}
          x={x}
          y={y}
          setX={setX}
          setY={setY}
          activeTarget={activeTarget}
          setActiveTarget={setActiveTarget}
        />
      </div>
    </div>
  );
};

export default Simulation;
