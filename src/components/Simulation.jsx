import React from "react";
import SideView from "./SideView";
import TopView from "./TopView";
import ParameterBox from "./ParameterBox";

const Simulation = () => {
  return (
    <div className="flex flex-row min-h-screen bg-[#0f0f0f] text-white">
      {/* ✅ ฝั่งซ้าย: สนามจำลอง */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="text-xl font-bold mb-2">Side View</div>
        <SideView />

        <div className="text-xl font-bold mt-6 mb-2">Top View</div>
        <TopView />
      </div>

      {/* ✅ ฝั่งขวา: พารามิเตอร์ */}
      <div className="w-[350px] mt-16 px-4 pb-6 bg-[#1a1a1a] border-l border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Input Parameters</h2>
        <ParameterBox />
      </div>
    </div>
  );
};

export default Simulation;
