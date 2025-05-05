import React from "react";
import fieldImage from "../assets/field.png";

const TopView = () => {
  return (
    <div className="w-[800px] h-[240px] bg-black border border-gray-700 rounded overflow-hidden flex items-end justify-start">
      <img
        src={fieldImage}
        alt="Top View Field"
        className="w-[800px] h-[240px] object-fill"
      />
    </div>
  );
};

export default TopView;
