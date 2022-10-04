
// This component has the input field which the user would use to find the weather at a location

import {useContext} from "react"
import WeatherContext from "../context/WeatherContext";
function Form() {
  const {handleSubmit} = useContext(WeatherContext);
  return (
    <div className="form">
      <form>
        <div className="form_flex">
          <div>
          <input
            className="search_city"
            type="search"
            placeholder="London"  
          ></input>
          </div>
          <div>
          <button type="button" className="btn">
            <span>Check!</span>
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form
