import { useRef, useState } from 'react';
import SideView from './SideView';
import TopView from './TopView';
import ParameterBox from './ParameterBox';

export default function SimulationPage({ isAdvanced, setIsAdvanced, setResultData }) {
  const [result, setResult] = useState(null);
  const sideViewRef = useRef(null);

  const handleStart = async (inputData) => {
    try {
      const res = await fetch("http://localhost:5000/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData)
      });
      const json = await res.json();
      if (json.status === 'success') {
        setResult(json.data);
        setResultData(json.data); // ✅ ส่งไปยัง App เพื่อให้ ResultPage ใช้ได้
      } else {
        alert("❌ Backend error: " + json.message);
      }
    } catch (error) {
      alert("❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
      console.error("Fetch error:", error);
    }
  };

  const handleStop = () => {
    sideViewRef.current?.stopAnimation();
  };

  return (
    <div className="flex flex-1 h-[calc(100vh-64px)]">
      <div className="flex flex-col flex-1 p-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h2 className="text-md font-bold mb-2">Side View</h2>
          <SideView ref={sideViewRef} trajectory={result} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h2 className="text-md font-bold mb-2">Top View</h2>
          <TopView trajectory={result?.projectile} />
        </div>
      </div>

      <div className="w-96 bg-white dark:bg-gray-800 shadow-lg p-4 overflow-y-auto">
        <ParameterBox
          onSubmit={handleStart}
          onStop={handleStop}
          isAdvanced={isAdvanced}
          setIsAdvanced={setIsAdvanced}
        />
      </div>
    </div>
  );
}