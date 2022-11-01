
// This component is used to display the weather in a card

import {useContext, useEffect} from "react"
import WeatherContext from "../context/WeatherContext";
import Spinner from "./Spinner";
import Error from "./Error";
import { v4 as uuid } from 'uuid';
import images from "../weather_icons"
const celsiusToFahrenheit = require('celsius-to-fahrenheit'); // for converting celsius to fahrenheit



function DisplayWeather() {

  
  // getting state, functions from the global context 
  const {weatherData,loading,city,fetchWeather, futureForecast, showError, showData, checkedState, celsiusToFahren, fahrenToCelsius} = useContext(WeatherContext);


  // fetching data only when the user enters a new city in the input field

  useEffect(() =>{
    fetchWeather();
  }, [city])
  
  // display weather of the particular location entered by user
  // temperature in degree Celsius

  if(!loading && !showError && showData && !checkedState){
    return (
      // card will display all the weather information
      <div className="card">

        <div className="location_info">

          <h3 className="city">{city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}</h3>

          {/* toggle button */}
          <div className="app-cover">
            <div className="row">
              <div className="toggle-button-cover">
                <div className="button-cover">
                  <div className="button r" id="button-1">
                    <input type="checkbox" className="checkbox" onChange={celsiusToFahren}/>
                    <div className="knobs"></div>
                    <div className="layer"></div>
                  </div>
                </div>
              </div>
            </div>    
          </div> 
        </div>

        {/* actual temperature */}
        <div className="main_weather">
          <h3>{weatherData.current.temperature}<sup className="main_exponent">&deg;C</sup></h3>
          <img src={images[`${weatherData.current.icon_num}.png`]} alt="weather icon" />
        </div>

        <div className="general_weather">
          <div className="day_weather">
            <p>Max temp of day: {weatherData.daily.data[0].all_day.temperature_max}<sup className="general_exponent">&deg;C</sup></p>
            <p>Min temp of day: {weatherData.daily.data[0].all_day.temperature_min}<sup className="general_exponent">&deg;C</sup></p>
            <p>Local date & time: {new Date().toLocaleString("en-US", { timeZone: `${weatherData.timezone}` })}</p>
          </div>

          <div className="other_description">
            <p>Description: {weatherData.current.summary}</p>
            <p>Precipitation: {weatherData.daily.data[0].all_day.precipitation.total} %</p>
            <p>Wind speed: {weatherData.current.wind.speed} km/h</p>
          </div>
        </div>

        {/* displaying whether forecast for upcoming days */}
        <div className="weather_flex">
          {futureForecast.map((weatherDay) =>{

            // for getting current date in the form of yy,mm,dd

            //gives date in form of yy-mm-dd
            let localDate=weatherDay.day; 

            // replaces all - (hyphen) with , (comma)
            localDate=localDate.replace(/-/g, ",");

            return (
            <ul className="future_weather" key={uuid()}>
              <li>{new Date(localDate).toLocaleDateString('en-US', {weekday:'long'})}</li>
              <li><img src={images[`${weatherDay.icon}.png`]} alt="weather icon" /></li>
              <li>{weatherDay.all_day.temperature_max}<sup className="unit">&deg;</sup> | {weatherDay.all_day.temperature_min}<sup className="unit">&deg;</sup></li>
            </ul>
          )})}
          
        </div>
      </div>
    )
  }

  // displays weather in degree Fahrenheits
  if(!loading && !showError && showData && checkedState){
    return (
      // card will display all the weather information
      <div className="card">

        <div className="location_info">
          <h3 className="city">{city}</h3>

          {/* toggle button */}
          <div className="app-cover">
            <div className="row">
              <div className="toggle-button-cover">
                <div className="button-cover">
                  <div className="button r" id="button-1">
                    <input type="checkbox" className="checkbox" onChange={fahrenToCelsius}/>
                    <div className="knobs"></div>
                    <div className="layer"></div>
                  </div>
                </div>
              </div>
            </div>    
          </div> 
        </div>

      {/* actual temperature */}
        <div className="main_weather">
          <h3>{celsiusToFahrenheit(weatherData.current.temperature).toFixed(1)}<sup className="main_exponent">&deg;F</sup></h3>
          <img src={images[`${weatherData.current.icon_num}.png`]} alt="weather icon" />
        </div>

        <div className="general_weather">
          <div className="day_weather">
            <p>Max temp of day: {celsiusToFahrenheit(weatherData.daily.data[0].all_day.temperature_max).toFixed(1)}<sup className="general_exponent">&deg;F</sup></p>
            <p>Min temp of day: {celsiusToFahrenheit(weatherData.daily.data[0].all_day.temperature_min).toFixed(1)}<sup className="general_exponent">&deg;F</sup></p>
            <p>Last updated: {new Date().toLocaleString("en-US", { timeZone: `${weatherData.timezone}` })}</p>

          </div>

          <div className="other_description">
            <p>Description: {weatherData.current.summary}</p>
            <p>Precipitation: {weatherData.daily.data[0].all_day.precipitation.total} %</p>
            <p>Wind speed: {weatherData.current.wind.speed} km/h</p>
          </div>
        </div>

        <div className="weather_flex">
          {futureForecast.map((weatherDay) =>{
            // for getting current date in the form of yy,mm,dd

            //gives date in form of yy-mm-dd
            let localDate=weatherDay.day; 

            // replaces all - (hyphen) with , ()comma
            localDate=localDate.replace(/-/g, ",");
            
            {/* displaying whether forecast for upcoming days */}
            return (
            <ul className="future_weather" key={uuid()}>
              <li>{new Date(localDate).toLocaleDateString('en-US', {weekday:'long'})}</li>
              <li><img src={images[`${weatherDay.icon}.png`]} alt="weather icon" /></li>
              <li>{celsiusToFahrenheit(weatherDay.all_day.temperature_max).toFixed(1)}<sup className="unit">&deg;</sup> | {celsiusToFahrenheit(weatherDay.all_day.temperature_min).toFixed(1)}<sup className="unit">&deg;</sup></li>
            </ul>
          )})}
          
        </div>
      </div>
    )
  }

  // if the user enters an invalid city, then the error message is displayed
  else if(showError){
    return (
      <Error/>
    )
  }

  // While the data is being fetched, the spinner/loader will be displayed
  else if(loading){
    return (
      <Spinner/>
    )
  }
  
  // no weather information is displayed
  // error message disappears after 3 seconds and this component kicks in
  else{
    return (
      <></>
    )
  }
}

export default DisplayWeather
