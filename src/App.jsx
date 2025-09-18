// App.jsx
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const getWeather = async (city) => {
    try {
      setError("");
      setWeather(null);
      setLoading(true);

      // Step 1: Get coordinates
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found!");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Get weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        city: `${name}, ${country}`,
        temp: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
        condition: weatherData.current_weather.weathercode,
      });
    } catch (err) {
      setError("Failed to fetch weather.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen w-screen flex flex-col items-center justify-start bg-gradient-to-b from-sky-400 via-blue-500 to-blue-700 px-4 py-8">
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white flex items-center gap-2 mb-8">
    🌦 Weather Now
  </h1>

  <div className="w-full max-w-lg flex flex-col items-center gap-6">
    <SearchBar onSearch={getWeather} />
    {error && <p className="text-red-200 text-center">{error}</p>}
    {loading && (
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    )}
    {weather && <WeatherCard weather={weather} />}
  </div>
</div>

  );
}

export default App;
