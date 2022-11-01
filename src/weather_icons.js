// This file creates the "images" object that contains all the weather icons
// This file is imported and weather icons are displayed in the DisplayWeather component

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

// fills images object with weather icons present in weather_icons folder
const images = importAll(
  require.context("./assets/weather_icons", false, /\.(png|jpe?g|svg)$/)
);

export default images;
