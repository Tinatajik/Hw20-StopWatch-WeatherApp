import React, { useState, useEffect } from "react";
import "./StopWatch.css";

export default function StopWatch() {
  return (
    <div className="container">
      <div className="timeDisplay"></div>
      <div className="buttons">
        <button className="btn bg-[#18a71e]">Start</button>

        <button className="btn bg-[#187ca7]">Lap</button>
        <button className="btn bg-[#a71818]">Stop</button>
        <button className="btn bg-[#fbc31e]">Reset</button>
      </div>
    </div>
  );
}
