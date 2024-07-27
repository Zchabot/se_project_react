import React, { useState, useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const [hover, setHover] = useState("");

  const handleMouseEnter = () => {
    setHover("hover");
  };

  const handleMouseLeave = () => {
    setHover("");
  };

  return (
    <div className="toggle__switch">
      <label
        htmlFor="switch"
        className={`toggle__switch-label ${
          hover === "hover" && "toggle__switch-label-hover"
        }`}
      >
        <input
          type="checkbox"
          className={`toggle__switch-checkbox ${
            hover === "hover" && "toggle__switch-checkbox-hover"
          }`}
          onChange={handleToggleSwitchChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <span
          className={`toggle__switch-slider ${
            currentTemperatureUnit === "F"
              ? `toggle__switch-slider-F ${
                  hover === "hover" && "toggle__switch-slider-F-hover"
                }`
              : `toggle__switch-slider-C ${
                  hover === "hover" && "toggle__switch-slider-C-hover"
                }`
          }`}
          onClick={handleToggleSwitchChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></span>
        <p
          className={`toggle__switch-temp-F ${
            currentTemperatureUnit === "F" && "toggle__switch-temp-active"
          }`}
          onClick={handleToggleSwitchChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          F
        </p>
        <p
          className={`toggle__switch-temp-C ${
            currentTemperatureUnit === "C" && "toggle__switch-temp-active"
          }`}
          onClick={handleToggleSwitchChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          C
        </p>
      </label>
    </div>
  );
};

export default ToggleSwitch;
