
// This component is used to display the weather in a card

import {useContext, useEffect} from "react"
import WeatherContext from "../context/WeatherContext";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import ErrorCard from "./ErrorCard";
import { v4 as uuid } from 'uuid';
import images from "../weather_icons"
const celsiusToFahrenheit = require('celsius-to-fahrenheit'); // for converting celsius to fahrenheit



function DisplayWeather() {

  
  // getting state, functions from the global context 
  const {weatherData, loading, city, fetchWeather, futureForecast, showError, showData, checkedState, changeTempUnit} = useContext(WeatherContext);


  // fetching data only when the user enters a new city in the input field

  useEffect(() =>{
    fetchWeather();
  }, [city])
  
  // display weather of the particular location entered by user

  if(!loading && !showError && showData){
    return (
      // card will display all the weather information
      <div className="card">

        <div className="location_info">

          <h3 className="city">{city.includes("-") ? city.replaceAll('-', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase()): city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}</h3>

          {/* toggle button */}
          <div className="app-cover">
            <div className="row">
              <div className="toggle-button-cover">
                <div className="button-cover">
                  <div className="button r" id="button-1">
                    <input type="checkbox" className="checkbox" onChange={changeTempUnit} title="Change temperature unit"/>
                    <div className="knobs"></div>
                    <div className="layer"></div>
                  </div>
                </div>
              </div>
            </div>    
          </div> 
        </div>

        {/* current temperature */}
        <div className="main_weather">
          <h3>{checkedState? weatherData.current.temperature : celsiusToFahrenheit(weatherData.current.temperature).toFixed(1)}<sup className="main_exponent">&deg;{checkedState ? "C": "F"}</sup></h3>
          <img src={images[`${weatherData.current.icon_num}.png`]} alt="weather icon" />
        </div>

        {/* max, min temperature */}

        <div className="general_weather">
          <div className="day_weather">
            <p>Max temp of day: {checkedState ? weatherData.daily.data[0].all_day.temperature_max : celsiusToFahrenheit(weatherData.daily.data[0].all_day.temperature_max).toFixed(1)}<sup className="general_exponent">&deg;{checkedState ? "C" : "F"}</sup></p>
            <p>Min temp of day: {checkedState ? weatherData.daily.data[0].all_day.temperature_min : celsiusToFahrenheit(weatherData.daily.data[0].all_day.temperature_min).toFixed(1)}<sup className="general_exponent">&deg;{checkedState ? "C" : "F"}</sup></p>
            <p>Local date & time: {new Date().toLocaleString("en-US", { timeZone: `${weatherData.timezone}` })}</p>
          </div>

          <div className="other_description">
            <p>Description: {weatherData.current.summary}</p>
            <p>Precipitation: {weatherData.daily.data[0].all_day.precipitation.total}%</p>
            <p>Wind speed: {weatherData.current.wind.speed} m/s</p>
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
              <li>{checkedState? weatherDay.all_day.temperature_max : celsiusToFahrenheit(weatherDay.all_day.temperature_max).toFixed(1)}<sup className="unit">&deg;</sup> | {checkedState? weatherDay.all_day.temperature_min : celsiusToFahrenheit(weatherDay.all_day.temperature_min).toFixed(1)}<sup className="unit">&deg;</sup></li>
            </ul>
          )})}
          
        </div>
      </div>
    )
  }


  // if the user enters an invalid city, then the error message is displayed
  else if(showError){
    return (
      <>
        <ErrorMessage/>
        <ErrorCard/>
      </>
    )
  }

  // While the data is being fetched, the spinner/loader will be displayed
  else if(loading){
    return (
      <Spinner/>
    )
  }
  
  // no weather information is displayed
  // error message disappears after 4 seconds and this component kicks in
  else{
    return (
      <ErrorCard/>
    )
  }
}

export default DisplayWeather
