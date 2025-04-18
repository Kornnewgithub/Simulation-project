import { useState } from 'react';

export default function SetupForm({ onCalculate }) {
  const [form, setForm] = useState({
    dropHeight: '',
    targetY: '',
    batLength: '',
    gear1: '',
    gear2: '',
    gear3: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onCalculate(form); // ส่งข้อมูลให้ parent
  };

  return (
    <div className="flex min-h-screen bg-yellow-50 p-6">
      {/* Left: รูปจำลอง */}
      <div className="w-1/2 flex justify-center items-center">
        <img
          src="/images/machine.png"
          alt="machine"
          className="max-w-xs h-auto drop-shadow"
        />
      </div>

      {/* Right: ฟอร์มกรอกข้อมูล */}
      <div className="w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          ตั้งค่าจำลอง
        </h2>

        <div className="grid grid-cols-2 gap-4 text-gray-800">
          {[
            { name: 'dropHeight', label: 'ความสูงลูกตก (m)' },
            { name: 'targetY', label: 'ระยะเป้าหมาย Y (m)' },
            { name: 'batLength', label: 'ความยาวไม้ตี (m)' },
            { name: 'gear1', label: 'จำนวนฟันเกียร์ 1' },
            { name: 'gear2', label: 'จำนวนฟันเกียร์ 2' },
            { name: 'gear3', label: 'จำนวนฟันเกียร์ 3' }
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          ))}
        </div>

        {/* ปุ่มส่งข้อมูล */}
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 mt-6 rounded-xl shadow transition-all"
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
}
