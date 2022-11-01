// Contains the global context provider which has all the states, functions that are used throughout the program
// 3rd party API to fetch weather information: WeatherDB

import { createContext, useState } from "react";

// Creating a new context

const WeatherContext = new createContext();

// Creating the context provider

export const WeatherProvider = ({ children }) => {
  // to store the fetched data
  // initially we don't have any data
  const [weatherData, setWeatherData] = useState({});

  // stores the status of the loader/spinner
  // while data is being fetched, the spinner is displayed
  const [loading, setLoading] = useState(true);

  // to store the location/city entered by the user
  // default location is London
  const [city, setCity] = useState("London");

  // to store the array that contains the weather forecast of the next 5 days
  const [futureForecast, setFutureForecast] = useState([]);

  // to show error message
  // initially we don't display error message
  const [showError, setShowError] = useState(false);

  // to display weather information
  // initially we display weather in London
  const [showData, setShowData] = useState(true);

  // stores the status of the checkbox
  // initially the checkbox is not checked
  const [checkedState, setCheckedState] = useState(false);

  // using the fetch API to fetch the data from OpenWeatherMap API to display the weather
  // the process of fetching data is asynchronous

  const fetchWeather = async () => {
    // fetching data
    try {
      const response = await fetch(
        `https://www.meteosource.com/api/v1/free/point?place_id=${city}&sections=current%2Cdaily&language=en&units=auto&key=${process.env.REACT_APP_API_KEY}`
      );

      const data = await response.json();

      setShowData(true);

      // storing the weather forecast for the next 5 days
      setFutureForecast(data.daily.data.slice(1, 6));

      // storing the fetched data
      setWeatherData(data);

      setShowError(false);
      setLoading(false);
    } catch (e) {
      // catching inavlid city/location entered by the user

      setShowData(false);
      setShowError(true); //show error
      setLoading(false);

      // error message is removed 3 seconds after its initial appearance
      // no weather information is displayed
      setTimeout(() => {
        setShowError(false);
        setShowData(false);
      }, 3000);
    }
  };

  // Handles form submit event or when the user has entered the city name and clicks the "check" button
  // We update the city entered by the user in the API call to fetch weather of that city

  const getWeatherInfo = (e) => {
    setLoading(true);
    setShowError(false);
    setCity(e.target[0].value); //updates the city name in the API
    e.target[0].value = "";
    e.preventDefault();
  };

  // when the checkbox is clicked, we display weather in degree Fahrenheit

  const celsiusToFahren = (e) => {
    if (e.target.checked) {
      setCheckedState((checked) => !checked);
    }
  };

  // this is the default/unchecked state that displays weather in degree Celsius
  const fahrenToCelsius = (e) => {
    if (!e.target.checked) {
      setCheckedState((checked) => !checked);
    }
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
        checkedState,
        getWeatherInfo,
        fetchWeather,
        celsiusToFahren,
        fahrenToCelsius,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
export default WeatherContext;
