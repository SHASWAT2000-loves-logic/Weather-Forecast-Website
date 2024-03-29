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

  // using the fetch API to fetch the data from Meteosource API to display the weather
  // the process of fetching data is asynchronous

  const fetchWeather = async () => {
    // fetching data
    try {
      const response = await fetch(
        `https://www.meteosource.com/api/v1/free/point?place_id=${city}&sections=current%2Cdaily&language=en&units=metric&key=${process.env.REACT_APP_API_KEY}`
      );

      const data = await response.json();

      setShowData(true);

      // storing the weather forecast for the next 5 days
      setFutureForecast(data.daily.data.slice(1, 6));

      // storing the fetched data
      setWeatherData(data);

      setShowError(false);
      setLoading(false);
    } catch {
      // catching inavlid city name entered by the user
      setShowData(false);
      setShowError(true); //show error
      setLoading(false);

      // error message is removed 4 seconds after its initial appearance
      // no weather information is displayed
      setTimeout(() => {
        setShowError(false);
        setShowData(false);
      }, 4000);
    }
  };

  // Handles form submit event or when the user has entered the city name and clicks the "check" button
  // We update the city entered by the user in the API call to fetch weather of that city

  const getWeatherInfo = (e) => {
    setLoading(true);
    setShowError(false);
    setCheckedState(false); //display temperature in degree Celsius as default
    let cityName = e.target[0].value; // storing the user input

    // removing all empty spaces at the start and end of the user input

    cityName = cityName.trim();

    // if(cityName==""){
    //   console.log("empty string");
    // }

    // API doesn't allow city name to contain whitespaces, instead it allows hyphen (-) between words
    // Accepted - New-York-City, Error - New York City
    // for user experience I have made sure that the whitespaces between the words entered by the user are converted to hyphen
    // this allows us to make the right API call to fetch weather of that city

    // checking whether the user input has a whitespace in it like New York City, New Delhi etc
    // then we reformat the city name entered by the user to a format accepted by the API

    if (cityName.includes(" ")) {
      cityName = cityName.replace(/\s+/g, "-"); //replacing whitespace (" ") between words to hyphen ("-")
    }
    setCity(cityName); //updates the city name in the API
    e.target[0].value = "";
    e.preventDefault();
  };

  // when the checkbox is clicked, we change the temperature unit
  // Celsius -> Fahrenheit or Fahrenheit -> Celsius

  const changeTempUnit = () => {
    setCheckedState((checked) => !checked);
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
        changeTempUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
export default WeatherContext;
