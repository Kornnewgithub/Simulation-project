// ✅ ParameterBox.jsx (อัปเดตให้ควบคุม Hitter และ Dropper แยกกัน)
import React from "react";

const ParameterBox = ({
  mode,
  setMode,
  onResetCAD,
  x,
  y,
  setX,
  setY,
  activeTarget,
  setActiveTarget,
}) => {
  const handleDefault = () => {
    setX("1.5");
    setY("0");
  };

  return (
    <div className="mt-24 px-4 py-4 rounded-lg text-white space-y-4">
      <h2 className="text-lg font-semibold">Input Parameters</h2>

      {/* Flexible */}
      <div className="space-y-1">
        <div className="font-semibold text-sm">Flexible Parameters</div>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label className="mb-1 text-sm">x (m):</label>
            <input
              type="number"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className="px-2 py-1 rounded bg-gray-800 text-white w-24"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">y (m):</label>
            <input
              type="number"
              value={y}
              onChange={(e) => setY(e.target.value)}
              className="px-2 py-1 rounded bg-gray-800 text-white w-24"
            />
          </div>
        </div>
      </div>

      {/* Fixed */}
      <div className="space-y-1">
        <div className="font-semibold text-sm mt-2">Fixed Parameters</div>
        {[
          { label: "gravity", value: "9.81", unit: "m/s²" },
          { label: "Launcher_height", value: "0.35", unit: "m" },
          { label: "Ball_mass", value: "0.057", unit: "kg" },
          { label: "stick_theta", value: "0–90", unit: "°" },
          { label: "BallDropper_height", value: "1.2", unit: "m" },
        ].map((item) => (
          <div key={item.label}>
            <label className="text-sm">
              {item.label} ({item.unit}):
            </label>
            <input
              type="text"
              value={item.value}
              disabled
              className="px-2 py-1 rounded bg-gray-800 text-white w-full opacity-80 cursor-not-allowed"
            />
          </div>
        ))}
      </div>

      {/* Sim Buttons */}
      <div className="flex justify-between pt-4">
        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded">Start</button>
        <button className="bg-red-600 hover:bg-red-500 px-4 py-1 rounded">Stop</button>
        <button
          className="bg-gray-500 hover:bg-gray-400 px-4 py-1 rounded"
          onClick={handleDefault}
        >
          Default
        </button>
      </div>

      {/* CAD Target Selector */}
      <div className="pt-6 space-y-2">
        <div className="font-semibold text-sm">Target Object</div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTarget("hitter")}
            className={`px-3 py-1 rounded ${activeTarget === "hitter" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            🎯 เครื่องตีลูก (Hitter)
          </button>
          <button
            onClick={() => setActiveTarget("dropper")}
            className={`px-3 py-1 rounded ${activeTarget === "dropper" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            📤 เครื่องปล่อยลูก (Dropper)
          </button>
        </div>

        {/* CAD Control Mode */}
        <div className="font-semibold text-sm pt-4">CAD Control Mode</div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setMode("move")}
            className={`px-3 py-1 rounded ${mode === "move" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            🔁 ลาก (คลิกซ้าย)
          </button>
          <button
            onClick={() => setMode("rotate")}
            className={`px-3 py-1 rounded ${mode === "rotate" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            🔄 หมุน (คลิกซ้าย)
          </button>
        </div>

        {/* Current mode + reset */}
        <div className="text-sm italic text-gray-300 mt-2">
          โหมดปัจจุบัน: {mode === "move" ? "ลาก (Move)" : mode === "rotate" ? "หมุน (Rotate)" : "ไม่มี (None)"}
        </div>

        <button
          onClick={onResetCAD}
          className="bg-yellow-600 hover:bg-yellow-500 px-3 py-1 rounded mt-2"
        >
          🔄 รีเซ็ตตำแหน่ง CAD
        </button>
      </div>
    </div>
  );
};

export default ParameterBox;
