// Contains the global context provider which has all the states, functions that are used throughout the program
// 3rd party API to fetch weather information: WeatherDB

import { createContext, useState } from "react";

// Creating a new context

const WeatherContext = new createContext();

// Creating the context provider

export const WeatherProvider = ({ children }) => {
  // to store the fetched data
  const [weatherData, setWeatherData] = useState({});

  // show loading state while the data is being fetched
  const [loading, setLoading] = useState(true);

  // to store the location/city entered by the user. Default location is London
  const [city, setCity] = useState("London");

  // to store the array that contains the weather forecast of the next 5 days
  const [futureForecast, setFutureForecast] = useState([]);

  // using the fetch API to fetch the data from OpenWeatherMap API to display the weather
  // the process of fetching data is asynchronous

  const fetchWeather = async () => {
    const response = await fetch(
      `https://weatherdbi.herokuapp.com/data/weather/${city}`
    );

    const data = await response.json();
    console.log(data);

    // we will display the weather forecast for the next 5 days
    setFutureForecast(data.next_days.slice(1, 6));
    setWeatherData(data);
    setLoading(false);
  };

  // When the user enters the city and clicks on the check button in the form, this function is called.
  // We just update the city entered by the user in the API call to fetch weather of that city

  const getWeatherInfo = (e) => {
    setLoading(true);
    setCity(e.target[0].value); //updates the city
    e.target[0].value = "";
    e.preventDefault();
  };
  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        city,
        futureForecast,
        getWeatherInfo,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
export default WeatherContext;
