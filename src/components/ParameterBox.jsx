import React, { useState } from 'react';
import './parameterBox.css';

function ParameterBox({ onSubmit, onStop }) {
  const [formData, setFormData] = useState({
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
    <div className="parameterBox">
      <h1>Simulation Parameters</h1>
      <form>
        <h2>Projectile</h2>
        <label>
          Gravity:
          <input
            type="number"
            value={formData.gravity}
            onChange={(e) => handleChange(e, null, 'gravity')}
          />
        </label>

        <h2>Launcher</h2>
        {Object.keys(formData.launcher).map((key) => (
          <label key={key}>
            {key}:
            <input
              type="number"
              value={formData.launcher[key]}
              onChange={(e) => handleChange(e, 'launcher', key)}
            />
          </label>
        ))}

        <h2>Ball Dropper</h2>
        {Object.keys(formData.balldropper).map((key) => (
          <label key={key}>
            {key}:
            <input
              type="number"
              value={formData.balldropper[key]}
              onChange={(e) => handleChange(e, 'balldropper', key)}
            />
          </label>
        ))}

        <h2>Gearbox</h2>
        {Object.keys(formData.gearbox).map((key) => (
          <label key={key}>
            {key}:
            <input
              type="number"
              value={formData.gearbox[key]}
              onChange={(e) => handleChange(e, 'gearbox', key)}
            />
          </label>
        ))}

        <button type="button" onClick={() => onSubmit(formData)}>
          Start
        </button>
        <button type="button" onClick={handleReset}>
          Default
        </button>
        <button type="button" onClick={onStop}>
          Stop
        </button>
      </form>
    </div>
  );
}

export default ParameterBox;
