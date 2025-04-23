import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function ResultPage({ result }) {
  const editableParams = result?.gearbox || {
    DrivenGear: 30,
    RPMmotor: 150,
  };

  const fixedParams = {
    stick_length: result?.launcher?.stick_length ?? 1.0,
    stick_mass: result?.launcher?.stick_mass ?? 1.0,
    DriverGear: result?.gearbox?.DriverGear ?? 30,
    Bounce_coefficient: result?.balldropper?.Bounce_coefficient ?? 0.8,
  };

  // 🔍 ตรวจสอบข้อมูลที่ใช้ทำกราฟ
  const chartData = result?.graphData || [
    { step: 1, RPM: 140, DrivenGear: 28 },
    { step: 2, RPM: 145, DrivenGear: 29 },
    { step: 3, RPM: 150, DrivenGear: 30 },
    { step: 4, RPM: 155, DrivenGear: 31 },
    { step: 5, RPM: 160, DrivenGear: 32 }
  ];

  return (
    <div className="flex flex-col items-end p-6 space-y-6">
      {/* 🛠 พารามิเตอร์ */}
      <div className="w-96 bg-gray-800 text-white rounded shadow p-4 space-y-4">
        <h2 className="text-lg font-semibold">Advanced Parameters</h2>

        <div className="space-y-2">
          <label className="block text-sm">Driven Gear (teeth)</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={editableParams.DrivenGear}
            readOnly
          />
          <label className="block text-sm">RPM Motor (rpm)</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={editableParams.RPMmotor}
            readOnly
          />
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Fixed Parameters</h3>
          <div className="grid grid-cols-1 gap-2">
            <div><label className="text-sm">Stick Length (m)</label><input type="number" value={fixedParams.stick_length} disabled className="w-full p-2 rounded bg-gray-700 text-white" /></div>
            <div><label className="text-sm">Stick Mass (kg)</label><input type="number" value={fixedParams.stick_mass} disabled className="w-full p-2 rounded bg-gray-700 text-white" /></div>
            <div><label className="text-sm">Driver Gear (teeth)</label><input type="number" value={fixedParams.DriverGear} disabled className="w-full p-2 rounded bg-gray-700 text-white" /></div>
            <div><label className="text-sm">Bounce Coefficient (–)</label><input type="number" value={fixedParams.Bounce_coefficient} disabled className="w-full p-2 rounded bg-gray-700 text-white" /></div>
          </div>
        </div>
      </div>

      {/* 📈 กราฟพารามิเตอร์ */}
      <div className="w-full bg-white dark:bg-gray-800 rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Parameter Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="step" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="RPM" stroke="#8884d8" />
            <Line type="monotone" dataKey="DrivenGear" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🧾 JSON แสดงผลลัพธ์ทั้งหมด */}
      {result && (
        <div className="w-full bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow p-4 text-sm">
          <h3 className="font-semibold mb-2">Raw Simulation Result</h3>
          <pre className="whitespace-pre-wrap break-all">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ResultPage;