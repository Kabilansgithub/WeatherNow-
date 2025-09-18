import React from "react";
import { weatherCodeMap } from "../assets/WeatherCode.js";

function WeatherCard({ weather }) {
  const code = weather.condition;
  const condition = weatherCodeMap[code] || { label: "Unknown", icon: "❓" };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md text-center">
  <h2 className="text-lg font-medium text-gray-700">{weather.city}</h2>
  <p className="text-5xl font-bold text-gray-900 my-4">{weather.temp}°C</p>
  <p className="text-xl flex justify-center items-center gap-2 text-gray-600">
    {condition.icon} {condition.label}
  </p>
  <p className="text-gray-500 mt-2">💨 Wind: {weather.wind} km/h</p>
</div>

  );
}

export default WeatherCard;
