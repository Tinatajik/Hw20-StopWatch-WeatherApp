import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "53ea0aaa85d8f82f6d01956e59de4c2e";

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeatherData(response.data);

      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError("City not found");
    }
  };

  useEffect(() => {
    if (city.trim() !== "") {
      fetchWeather();
    }
  }, [city]);

  const getCurrentDate = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  const getWeatherIcon = (weatherCondition) => {
    const iconMappings = {
      Clear: "./img/sunny.png",
      Clouds: "./img/cluodly.png",
      Rain: "./img/rainy.png",
      Snow: "./img/snow.png",
      Mist: "./img/mist.png",
      Thunderstorm: "./img/storm.png",
      Fog: "./img/fog.png",
      Haze: "./img/haze.png",
    };

    return iconMappings[weatherCondition] || "./img/cluodly.png";
  };

  return (
    <div className="w-[215vh] flex justify-center">
      <input
        className="w-1/2 p-3 bg-[#343D4B] border-white border rounded-lg absolute top-10 text-white"
        type="text"
        placeholder="Search city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            fetchWeather();
          }
        }}
      />
      <div className="flex items-center ml-44">
        {weatherData && (
          <>
            <img src="./img/bg.png" className="h-3/5 relative" />
            <div className="text-white text-xl  absolute mt-[-14rem] z-10 p-5 flex flex-col">
              <p className="w-36">{getCurrentDate()}</p>
              <div className="flex">
                <svg
                  width="20"
                  height="20"
                  className="mt-1"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.15625 11.25C8.15625 8.29873 10.5487 5.90625 13.5 5.90625C16.4513 5.90625 18.8437 8.29873 18.8437 11.25C18.8437 14.2013 16.4513 16.5938 13.5 16.5938C10.5487 16.5938 8.15625 14.2013 8.15625 11.25ZM13.5 7.59375C11.4807 7.59375 9.84375 9.23071 9.84375 11.25C9.84375 13.2693 11.4807 14.9062 13.5 14.9062C15.5193 14.9062 17.1562 13.2693 17.1562 11.25C17.1562 9.23071 15.5193 7.59375 13.5 7.59375Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.96491 9.96396C4.36352 5.12802 8.4047 1.40625 13.257 1.40625H13.743C18.5953 1.40625 22.6365 5.12802 23.0351 9.96396C23.2492 12.5617 22.4468 15.1413 20.7968 17.1591L15.4046 23.7537C14.4202 24.9575 12.5798 24.9575 11.5954 23.7537L6.20321 17.1591C4.55322 15.1413 3.75077 12.5617 3.96491 9.96396ZM13.257 3.09375C9.28293 3.09375 5.97317 6.14191 5.6467 10.1026C5.46849 12.2647 6.13634 14.4115 7.50958 16.091L12.9018 22.6855C13.211 23.0636 13.789 23.0636 14.0982 22.6855L19.4904 16.091C20.8637 14.4115 21.5315 12.2647 21.3533 10.1026C21.0268 6.14191 17.7171 3.09375 13.743 3.09375H13.257Z"
                    fill="white"
                  />
                </svg>
                <h3>
                  {weatherData.name}, {weatherData.sys.country}
                </h3>
              </div>
            </div>
            <div className="absolute text-white p-5 bottom-[7rem] font-bold text-xl">
              <img
                src={getWeatherIcon(weatherData.weather[0].main)}
                className="h-3/5 relative"
                alt="Weather Icon"
              />

              <p>{convertKelvinToCelsius(weatherData.main.temp)} °C</p>
              <p> {weatherData.weather[0].description}</p>
            </div>
            <div className="bg-[#222831] h-[55%] w-[21rem] rounded-2xl text-white p-7 font-bold flex flex-col gap-3">
              <p className="flex justify-between">
                PRECIPITATION: <span> {weatherData.clouds.all}</span>
              </p>
              <p className="flex justify-between">
                HUMIDITY: <span>{weatherData.main.humidity} %</span>{" "}
              </p>
              <p className="flex justify-between">
                WIND: <span>{weatherData.wind.speed} km/h</span>
              </p>
              <div className="flex mt-7 gap-1 w-[18rem]">
                <div className="flex flex-col text-black bg-white px-2 py-3  rounded-lg items-center text-center">
                  <img
                    src={getWeatherIcon(weatherData.weather[0].main)}
                    className="w-8"
                  />
                  <p>Thu</p>
                  <p>{convertKelvinToCelsius(weatherData.main.temp)} °C</p>
                </div>
                <div className="flex flex-col text-white bg-[#272E37] px-2 py-3 rounded-lg items-center text-center">
                  <img
                    src={getWeatherIcon(weatherData.weather[0].main)}
                    className="w-8"
                  />
                  <p>Fri</p>
                  <p>{convertKelvinToCelsius(weatherData.main.temp)} °C</p>
                </div>
                <div className="flex flex-col text-white bg-[#272E37] px-2 py-3 rounded-lg items-center text-center">
                  <img src="./img/cloud.png" className="w-8" />
                  <p>Sat</p>
                  <p>{convertKelvinToCelsius(weatherData.main.temp)} °C</p>
                </div>
                <div className="flex flex-col text-white bg-[#272E37] px-2 py-3 rounded-lg items-center text-center">
                  <img src="./img/cloud.png" className="w-8" />
                  <p>sun</p>
                  <p>{convertKelvinToCelsius(weatherData.main.temp)} °C</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {error && <p className="text-white mr-48 text-5xl">{error}</p>}
    </div>
  );
};

export default Weather;
