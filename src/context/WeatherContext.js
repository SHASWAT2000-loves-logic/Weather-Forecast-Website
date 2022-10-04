// Contains the Context provider which has all the states, functions that are used throughout the program

import { createContext, useState } from "react";

// Creating a new context

const WeatherContext = new createContext();

// Creating the context provider

export const WeatherProvider = ({ children }) => {
  // to store the fetched data
  const [fetchedData, setFetchedData] = useState({});

  // show loading state while the data is being fetched
  const [loading, setLoading] = useState(true);

  //for local time at the position entered by the user
  const [time, setTime] = useState("");

  //for date at the location entered by the user
  const [date, setDate] = useState("");

  // uses the fetch API to fetch the data from OpenWeatherMap API to display the weather

  const fetchWeather = async () => {
    const API_key = process.env.REACT_APP_API_KEY;

    // The default location is London
    const inputVal = "London";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${API_key}&units=imperial`
    );
    const data = await response.json();
    setFetchedData(data);
    setLoading(false);

    // calculating the local time, date and day

    let newDate = new Date();
    let currentTime = newDate.getTime();
    let localOffset = newDate.getTimezoneOffset() * 60000;
    let utcTime = currentTime + localOffset;
    let timezone = data.timezone;
    let cityTime = utcTime + 1000 * timezone;
    let localTime = new Date(cityTime);
    setTime(localTime.toLocaleTimeString());
    setDate(
      localTime.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
  };

  //TODO - handle the case when the user enters a location

  const handleSubmit = (e) => {
    console.log("form submitted");
    e.preventDefault();
  };
  return (
    <WeatherContext.Provider
      value={{
        fetchedData,
        loading,
        time,
        date,
        handleSubmit,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
export default WeatherContext;
