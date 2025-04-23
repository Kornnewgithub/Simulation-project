import React, { useState } from 'react';
import './parameterBox.css';

function ParameterBox({ onSubmit, onStop, isAdvanced, setIsAdvanced }) {
  const [formData, setFormData] = useState({
    position: { x: 0, y: 0 },
    gravity: 9.81,
    launcher: {
      Launcher_height: 1.0,
      stick_length: 1.0,
      stick_mass: 1.0,
      stick_theta: 45.0,
    },
    balldropper: {
      BallDropper_height: 2.0,
      Ball_mass: 0.5,
      Bounce_coefficient: 0.8,
    },
    gearbox: {
      DrivenGear: 36,
      DriverGear: 30,
      RPMmotor: 3000,
    },
  });

  const handleChange = (e, category, key) => {
    const value = parseFloat(e.target.value);
    if (category) {
      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleReset = () => {
    setFormData({
      position: { x: 0, y: 0 },
      gravity: 9.81,
      launcher: {
        Launcher_height: 1.0,
        stick_length: 1.0,
        stick_mass: 1.0,
        stick_theta: 45.0,
      },
      balldropper: {
        BallDropper_height: 2.0,
        Ball_mass: 0.5,
        Bounce_coefficient: 0.8,
      },
      gearbox: {
        DrivenGear: 36,
        DriverGear: 30,
        RPMmotor: 3000,
      },
    });
  };

  return (
    <div className="parameterBox p-4 bg-gray-800 text-white rounded shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">sim ปกติ</h2>
        <input
          type="checkbox"
          checked={isAdvanced}
          onChange={(e) => setIsAdvanced(e.target.checked)}
          title="Advanced Mode"
        />
      </div>

      <div>
        <h3 className="font-semibold">ตำแหน่งเริ่มต้น</h3>
        <label className="text-sm">Position X (m)</label>
        <input className="input" type="number" value={formData.position.x} onChange={(e) => handleChange(e, 'position', 'x')} />
        <label className="text-sm mt-2">Position Y (m)</label>
        <input className="input" type="number" value={formData.position.y} onChange={(e) => handleChange(e, 'position', 'y')} />
      </div>

      {!isAdvanced && (
        <>
          <h3 className="font-semibold">ค่าที่ไม่สามารถเปลี่ยนได้</h3>
          <div className="grid grid-cols-2 gap-2">
            <input disabled value={`${formData.gravity} m/s²`} className="input" />
            <input disabled value={`${formData.launcher.Launcher_height} m`} className="input" />
            <input disabled value={`${formData.balldropper.Ball_mass} kg`} className="input" />
            <input disabled value={`${formData.launcher.stick_theta} °`} className="input" />
            <input disabled value={`${formData.balldropper.BallDropper_height} m`} className="input col-span-2" />
          </div>
        </>
      )}

      {isAdvanced && (
        <>
          <h3 className="font-semibold">Advanced Parameters</h3>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-sm">Gravity (m/s²)</label>
            <input className="input" type="number" value={formData.gravity} onChange={(e) => handleChange(e, null, 'gravity')} />

            <label className="text-sm">Launcher Height (m)</label>
            <input className="input" type="number" value={formData.launcher.Launcher_height} onChange={(e) => handleChange(e, 'launcher', 'Launcher_height')} />

            <label className="text-sm">Ball Mass (kg)</label>
            <input className="input" type="number" value={formData.balldropper.Ball_mass} onChange={(e) => handleChange(e, 'balldropper', 'Ball_mass')} />

            <label className="text-sm">Stick Theta (°)</label>
            <input className="input" type="number" value={formData.launcher.stick_theta} onChange={(e) => handleChange(e, 'launcher', 'stick_theta')} />

            <label className="text-sm col-span-2">Ball Dropper Height (m)</label>
            <input className="input col-span-2" type="number" value={formData.balldropper.BallDropper_height} onChange={(e) => handleChange(e, 'balldropper', 'BallDropper_height')} />
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={() => onSubmit(formData)} className="btn-blue">Start</button>
        <button onClick={handleReset} className="btn-blue">Default</button>
        <button onClick={onStop} className="btn-blue">Stop</button>
        {isAdvanced && (
          <button className="btn-blue">+ Add Field</button>
        )}
      </div>
    </div>
  );
}

export default ParameterBox;
