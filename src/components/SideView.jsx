import React from "react";
import fieldImage from "../assets/field.png";

const SideView = () => {
  return (
    <div className="w-[800px] h-[240px] bg-black border border-gray-700 rounded overflow-hidden flex items-end justify-start">
      <img
        src={fieldImage}
        alt="Side View Field"
        className="w-[800px] h-[70px] object-fill"
      />
    </div>
  );
};

export default SideView;
