const cityName = document.querySelector("#input").value;
const searchBtn = document.querySelector("#btn");
const apiKey = "c4469ecbd18e75a602305e38b08651eb";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const getProperIcon = (data) => {
  if (data == "Clouds") {
    return "weather-img/clouds.png";
  } else if (data == "Clear") {
    return "weather-img/clear.png";
  } else if (data == "Drizzle") {
    return "weather-img/drizzle.png";
  } else if (data == "Rain") {
    return "weather-img/rain.png";
  } else if (data == "Mist") {
    return "weather-img/mist.png";
  } else if (data == "Snow") {
    return "weather-img/snow.png";
  }
};

//save info for city in localstorage
localStorage.setItem("historyList", cityName );

//if localStorage has historyList then return it
let saved = localStorage.getItem("historyList")

//weather information
const getWeatherInfo = async (city) => {
  const weatherForecast = document.querySelector(".weather-forecast");
  const dayOfSelect = 10;

  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
  const data = await response.json();

  if (data.cod === "404") {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-forecast").style.display = "none";
  } else if (data.cod === "200") {
    for (let i = 0; i < dayOfSelect; i++) {

      //filter forecast to get speciall forecast per day
      const uniqueForecastDays = [];
      const fiveDayForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
        console.log(forecastDate)
      });
    }
    // Change temperature
    for (let i = 0; i < dayOfSelect; i++) {

      // Create the article element:
      const articleElement = document.createElement("article");
      articleElement.classList.add("weather-forecast-item");

      // Create the image element:
      const imgElement = document.createElement("img");
      imgElement.setAttribute(
        "src",
        getProperIcon(data.list[i].weather[0].main)
      );
      imgElement.setAttribute("alt", "weather-picture");
      imgElement.classList.add("weather-forecast-icon");

      // Create the h2 element:
      const h2Element = document.createElement("h2");
      h2Element.classList.add("weather-forecast-day");
      h2Element.textContent = data.list[i].dt_txt;

      // Create the p element:
      const pElement = document.createElement("p");
      pElement.classList.add("weather-forecast-temperature");

      // Create the span element within the p element:
      const spanElement = document.createElement("span");
      spanElement.classList.add("value");
      spanElement.textContent = "Temp:" + " "+ Math.round(data.list[i].main.temp);

      // Add the span element as a child of the p element:
      pElement.appendChild(spanElement);

      // Add the °C text to the end of the p element:
      pElement.innerHTML += "&deg;C";

      //create p2(min temp)
      const pElement2 = document.createElement("p");
      pElement2.classList.add("weather-forecast-mintemp");
      pElement2.textContent = "Min-temp:" + " "+ Math.round(data.list[i].main.temp_min) + "°c";

      //create p3(max temp)
      const pElement3 = document.createElement("p");
      pElement3.classList.add("weather-forecast-maxtemp");
      pElement3.textContent = "Max-temp:" + " "+ Math.round(data.list[i].main.temp_max )+ "°c";

      //create p4(humidity)
      const pElement4 = document.createElement("p");
      pElement4.classList.add("weather-forecast-humidity");
      pElement4.textContent = "Humidity:" + " "+  Math.round(data.list[i].main.humidity)+ "%";

      // Add the image, h2, and p elements as children of the article element:
      articleElement.appendChild(imgElement);
      articleElement.appendChild(h2Element);
      articleElement.appendChild(pElement);
      articleElement.appendChild(pElement2);
      articleElement.appendChild(pElement3);
      articleElement.appendChild(pElement4);

      // Add the article element as a child of the weatherForecast div:
      weatherForecast.appendChild(articleElement);
    }
  }
};

//change result by clicking the button
const searchInput = document.querySelector("#input");
searchBtn.addEventListener("click", () => getWeatherInfo(searchInput.value));

//change result by Enter on the button
document.addEventListener("keydown", (event) => {
if (event.key == "Enter") {getWeatherInfo(searchInput.value);}
});


//(insomnia)https://api.openweathermap.org/data/2.5/forecast?q=tehran&appid=c4469ecbd18e75a602305e38b08651eb

//(api)https://openweathermap.org/api
