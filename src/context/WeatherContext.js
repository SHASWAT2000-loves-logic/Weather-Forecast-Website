// Contains the global context provider which has all the states, functions that are used throughout the program
// 3rd party API to fetch weather information: OpenWeatherMap API

import { createContext, useState } from "react";

// Creating a new context

const WeatherContext = new createContext();

// Creating the context provider

export const WeatherProvider = ({ children }) => {
  // to store the fetched data
  const [weatherData, setWeatherData] = useState({});

  // show loading state while the data is being fetched
  const [loading, setLoading] = useState(true);

  // to store local time at the position entered by the user
  const [time, setTime] = useState("");

  // to store date at the location entered by the user
  const [date, setDate] = useState("");

  // to store the location/city entered by the user. Default location is London
  const [city, setCity] = useState("London");

  // uses the fetch API to fetch the data from OpenWeatherMap API to display the weather
  // the process of fetching data is asynchronous

  const fetchWeather = async () => {
    const API_key = process.env.REACT_APP_API_KEY;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=imperial`
    );

    const data = await response.json();

    console.log(data);

    setWeatherData(data);
    setLoading(false);

    // calculating the local time, date and day of the location entered by the user

    let computerDate = new Date();
    let computerTime = computerDate.getTime();
    let localOffset = computerDate.getTimezoneOffset() * 60000;
    let utcTime = computerTime + localOffset;
    let timezone = data.timezone;
    let correctedTime = utcTime + 1000 * timezone;
    let localTime = new Date(correctedTime);

    // updates the local time that will be displayed to the user
    setTime(localTime.toLocaleTimeString());

    // updates the date of the location entered by the user that will be displayed to the user
    setDate(
      localTime.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
  };

  // When the user enters the city and clicks on the check button in the form, this function is called.
  // We just update the city entered by the user in the API call to fetch weather of that city

  const getWeatherInfo = (e) => {
    setCity(e.target[0].value); //updates the city
    e.preventDefault();
  };
  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        time,
        date,
        city,
        getWeatherInfo,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
export default WeatherContext;
