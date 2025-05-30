import React, { useState } from "react";
import TopView from "./TopView";
import ParameterBox from "./ParameterBox";

const Simulation = () => {
  const [activeTarget, setActiveTarget] = useState("hitter");
  const [x, setX] = useState("1.5");
  const [y, setY] = useState("0");
  const [fieldType, setFieldType] = useState("D"); // 👈 เพิ่มตัวแปรควบคุมสนาม

  const handleSimulate = async () => {
    try {
      const response = await fetch("http://localhost:5000/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ x: parseFloat(x), y: parseFloat(y) }),
      });

      const data = await response.json();
      console.log(data.trajectory); // 🔍 คุณสามารถนำไปใช้แสดงใน TopView ได้ภายหลัง
    } catch (error) {
      console.error("Simulation error:", error);
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-[#0f0f0f] text-white">
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="text-xl font-bold mt-6 mb-2">Top View</div>
        <TopView
          x={x}
          y={y}
          activeTarget={activeTarget}
          fieldType={fieldType} // 👈 ส่งค่า fieldType ไปให้ TopView
        />
      </div>

      <div className="w-[350px] mt-16 px-4 pb-6 bg-[#1a1a1a] border-l border-gray-700">
        <ParameterBox
          x={x}
          y={y}
          setX={setX}
          setY={setY}
          activeTarget={activeTarget}
          setActiveTarget={setActiveTarget}
          onSimulate={handleSimulate}
          fieldType={fieldType}           // 👈 ส่งไป ParameterBox
          setFieldType={setFieldType}     // 👈 ส่งไป ParameterBox
        />
      </div>
    </div>
  );
};

export default Simulation;
