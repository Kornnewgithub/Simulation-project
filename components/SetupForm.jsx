import React from "react";

const SetupForm = ({
  angle, setAngle,
  velocity, setVelocity,
  mass, setMass,
  height, setHeight,
  rpm, setRpm,
  setResultData,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setResultData({ angle, velocity, mass, height, rpm });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 text-white p-4 rounded shadow w-full md:w-[320px] flex flex-col gap-3"
    >
      <label>
        Angle (degrees)
        <input type="number" value={angle} onChange={(e) => setAngle(+e.target.value)} className="w-full p-2 text-black" />
      </label>
      <label>
        Velocity (m/s)
        <input type="number" value={velocity} onChange={(e) => setVelocity(+e.target.value)} className="w-full p-2 text-black" />
      </label>
      <label>
        Mass (kg)
        <input type="number" value={mass} onChange={(e) => setMass(+e.target.value)} className="w-full p-2 text-black" />
      </label>
      <label>
        Height (m)
        <input type="number" value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full p-2 text-black" />
      </label>
      <label>
        RPM
        <input type="number" value={rpm} onChange={(e) => setRpm(+e.target.value)} className="w-full p-2 text-black" />
      </label>
      <button type="submit" className="bg-blue-600 py-2 mt-2 rounded">
        ยิง
      </button>
    </form>
  );
};

export default SetupForm;
