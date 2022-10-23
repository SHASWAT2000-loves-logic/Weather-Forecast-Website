
// This component is used to display the weather in a card

import {useContext, useEffect} from "react"
import WeatherContext from "../context/WeatherContext";
import Spinner from "./Spinner";
import Error from "./Error";
import { v4 as uuid } from 'uuid';

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

          <h3 className="city">{weatherData.region}</h3>

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
        <div className="main_weather">
          <h3>{weatherData.currentConditions.temp.c}<sup className="main_exponent">&deg;C</sup></h3>
          <img src={weatherData.currentConditions.iconURL} alt="weather icon" />
        </div>

        <div className="general_weather">
          <div className="day_weather">
            <p>Max temp of day: {weatherData.next_days[0].max_temp.c}<sup className="general_exponent">&deg;C</sup></p>
            <p>Min temp of day: {weatherData.next_days[0].min_temp.c}<sup className="general_exponent">&deg;C</sup></p>
            <p>Last Updated: {weatherData.currentConditions.dayhour} (local time)</p>
          </div>

          <div className="hourly_description">
            <p>Description: {weatherData.currentConditions.comment}</p>
            <p>Humidity: {weatherData.currentConditions.humidity}</p>
            <p>Precipitation: {weatherData.currentConditions.precip}</p>
          </div>
        </div>

        <div className="weather_flex">
          {futureForecast.map((weatherDay) =>{
            return (
            <ul className="future_weather" key={uuid()}>
              <li>{weatherDay.day}</li>
              <li><img src={weatherDay.iconURL} alt="weather icon"/></li>
              <li>{weatherDay.max_temp.c}<sup className="celsius">&deg;</sup> | {weatherDay.min_temp.c}<sup className="celsius">&deg;</sup></li>
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
          <h3 className="city">{weatherData.region}</h3>
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
      
        <div className="main_weather">
          <h3>{weatherData.currentConditions.temp.f}<sup className="main_exponent">&deg;F</sup></h3>
          <img src={weatherData.currentConditions.iconURL} alt="weather icon" />
        </div>

        <div className="general_weather">
          <div className="day_weather">
            <p>Max temp of day: {weatherData.next_days[0].max_temp.f}<sup className="general_exponent">&deg;F</sup></p>
            <p>Min temp of day: {weatherData.next_days[0].min_temp.f}<sup className="general_exponent">&deg;F</sup></p>
            <p>Last Updated: {weatherData.currentConditions.dayhour} (local time)</p>
          </div>

          <div className="hourly_description">
            <p>Description: {weatherData.currentConditions.comment}</p>
            <p>Humidity: {weatherData.currentConditions.humidity}</p>
            <p>Precipitation: {weatherData.currentConditions.precip}</p>
          </div>
        </div>

        <div className="weather_flex">
          {futureForecast.map((weatherDay) =>{
            return (
            <ul className="future_weather" key={uuid()}>
              <li>{weatherDay.day}</li>
              <li><img src={weatherDay.iconURL} alt="weather icon"/></li>
              <li>{weatherDay.max_temp.f}<sup className="celsius">&deg;</sup> | {weatherDay.min_temp.f}<sup className="celsius">&deg;</sup></li>
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
