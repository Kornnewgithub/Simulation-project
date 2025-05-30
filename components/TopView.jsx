import React from "react";

const TopView = ({ x, y, activeTarget, fieldType }) => {
  // ขนาดสนามจริงตามชนิดสนาม
  const FIELD_WIDTH_M = fieldType === "field" ? 0.5 : 5.3;
  const FIELD_HEIGHT_M = fieldType === "field" ? 0.8 : 2.0;

  const PIXEL_WIDTH = 950;
  const PIXEL_HEIGHT = 500;

  // จุดอ้างอิง Swing Area (0,0)
  const ORIGIN_X_PX = 69;
  const ORIGIN_Y_PX = 250;

  const meterToPixel = (mx, my) => {
    const px = ORIGIN_X_PX + (mx / FIELD_WIDTH_M) * PIXEL_WIDTH;
    const py = ORIGIN_Y_PX - (my / FIELD_HEIGHT_M) * PIXEL_HEIGHT;
    return [px, py];
  };

  // ยังสามารถใช้พิกัดพิกเซลจริงได้สำหรับตำแหน่ง CAD
  const hitterPosition = fieldType === "field"
    ? { left: "110px", top: "340px" } // ตำแหน่งของ Hitter สำหรับ field.png
    : { left: "69px", top: "335px" }; // ตำแหน่งของ Hitter สำหรับ D.png

  const dropperPosition = fieldType === "field"
    ? { left: "95px", top: "150px" } // ตำแหน่งของ Dropper สำหรับ field.png
    : { left: "55px", top: "145px" }; // ตำแหน่งของ Dropper สำหรับ D.png

  const backgroundImage = fieldType === "field"
    ? "/desktop_pc/field.png"
    : "/desktop_pc/D.png";

  return (
    <div className="relative w-[950px] h-[500px] bg-black border border-gray-700 rounded overflow-hidden">
      {/* พื้นหลังสนาม */}
      <img
        src={backgroundImage}
        alt="Top View Background"
        className="absolute top-0 left-0 w-[950px] h-[500px] object-fill"
        style={{ zIndex: 0 }}
      />

      {/* จุดอ้างอิง (0,0) */}
      <div
        style={{
          position: "absolute",
          left: `${ORIGIN_X_PX - 6}px`,
          top: `${ORIGIN_Y_PX - 6}px`,
          width: "12px",
          height: "12px",
          backgroundColor: "lime",
          borderRadius: "50%",
          border: "2px solid white",
          zIndex: 100,
        }}
      />

      {/* 🔴 เครื่องตี */}
      <img
        src="/desktop_pc/Assemble2.PNG"
        alt="Hitter"
        className="absolute"
        style={{
          ...hitterPosition,
          width: "300px",
          height: "300px",
          objectFit: "contain",
          zIndex: 10,
          border: "2px solid red",
          transform: "translate(-50%, -50%) scaleY(-1)",
        }}
      />

      {/* 🔵 เครื่องปล่อย */}
      <img
        src="/desktop_pc/Main_Assembly1.PNG"
        alt="Dropper"
        className="absolute"
        style={{
          ...dropperPosition,
          width: "400px",
          height: "400px",
          objectFit: "contain",
          zIndex: 9,
          border: "2px solid blue",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default TopView;
