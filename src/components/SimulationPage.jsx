import { useRef, useState } from 'react';
import SideView from './SideView';
import TopView from './TopView';
import ParameterBox from './ParameterBox';

export default function SimulationPage() {
  const [result, setResult] = useState(null);
  const sideViewRef = useRef(null);

  // เรียกเมื่อผู้ใช้กดปุ่ม Start
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
      } else {
        alert("❌ Backend error: " + json.message);
      }
    } catch (error) {
      alert("❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
      console.error("Fetch error:", error);
    }
  };

  // เรียกเมื่อผู้ใช้กดปุ่ม Stop
  const handleStop = () => {
    sideViewRef.current?.stopAnimation();
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      
      {/* ด้านซ้าย: หน้าจอแสดงผลจำลอง */}
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

      {/* ด้านขวา: กล่องกรอกข้อมูล */}
      <div className="w-96 bg-white dark:bg-gray-800 shadow-lg p-4 overflow-y-auto">
        <ParameterBox onSubmit={handleStart} onStop={handleStop} />
      </div>
    </div>
  );
}
