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

  // to show error message
  const [showError, setShowError] = useState(false);

  // to display weather information
  const [showData, setShowData] = useState(true);

  // using the fetch API to fetch the data from OpenWeatherMap API to display the weather
  // the process of fetching data is asynchronous

  const fetchWeather = async () => {
    const response = await fetch(
      `https://weatherdbi.herokuapp.com/data/weather/${city}`
    );
    const data = await response.json();

    // catching invalid city/location
    if (data.status === "fail") {
      setShowData(false);
      setShowError(true); //show error
      setLoading(false);

      // error message is removed 3 seconds after its initial appearance
      // no weather information is displayed
      setTimeout(() => {
        setShowError(false);
        setShowData(false);
      }, 3000);
    } else {
      setShowData(true);
      // storing the weather forecast for the next 5 days
      setFutureForecast(data.next_days.slice(1, 6));

      // storing the fetched data
      setWeatherData(data);

      setShowError(false);
      setLoading(false);
    }
  };

  // Handles submit form event
  // We update the city entered by the user in the API call to fetch weather of that city

  const getWeatherInfo = (e) => {
    setLoading(true);
    setShowError(false);
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
        showError,
        showData,
        getWeatherInfo,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
export default WeatherContext;
