import React from "react";

export default function Laps({ laps }) {
  return (
    <div className="mt-8" style={{ display: laps.length ? "block" : "none" }}>
      <h3 className="flex justify-between m-2 text-left">
        <span>Lap</span>
        <span>Time</span>
      </h3>
      <ul className="p-0 ">
        {laps.map((lap, index) => (
          <li
            className="flex justify-between items-center px-5 py-1  w-full"
            key={index}
          >
            <span>{` ${index + 1}`}</span>
            <span>{lap}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
