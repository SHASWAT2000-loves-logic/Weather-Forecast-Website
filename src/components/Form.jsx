
// This component has the input field which the user would use to find the weather at a location

import {useContext} from "react"
import WeatherContext from "../context/WeatherContext";
function Form() {
  const {getWeatherInfo} = useContext(WeatherContext);
  return (
    <div className="form">
      <form onSubmit={getWeatherInfo}>
        <div className="form_flex">
          <div>
          <input
            className="search_city"
            type="search"
            placeholder="Search city"  
          ></input>
          </div>
          <div>
          <button type="submit" className="btn">
            <span>Check!</span>
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form
