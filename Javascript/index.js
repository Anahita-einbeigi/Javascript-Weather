const timeEl= document.getElementById("time");
const dateEl= document.getElementById("date");
const searchInput= document.querySelector(".search input");
const searchBtn= document.querySelector(".search button");
const weatherIcon= document.querySelector(".weather-icon");
const apiKey="c4469ecbd18e75a602305e38b08651eb";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//set time
const days=[ 'Söndag','Måndag','Tisdag','Onsdag','Tordag','Fredag','Lördag']
const months=['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Oct','November','December',]
setInterval(()=>{
  const time= new Date();
  const month= time.getMonth();
  const date= time.getDate();
  const day= time.getDay();
  const hour= time.getHours();
  const hoursIn12HrFormat= hour>=13 ? hour %12 : hour;
  const minutes= time.getMinutes();
  const ampm= hour >=12 ? 'Pm': 'Am' ;

  timeEl.innerHTML= hoursIn12HrFormat + ':' + minutes + `<span id='am-pm'>${ampm}</span>`
  dateEl.innerHTML= days[day]+ ' ' + ','+ date + ' ' +months[month]
}, 10);

//checkWeather
async function checkweather(city){
  const response= await fetch(apiUrl+ city + `&appid=${apiKey}`)
  //show error
  if(response.status === 404){
    document.querySelector(".error").style.display= "block";
    document.querySelector(".weather").style.display= "none";
  }
  else{
    const result= await response.json();
    document.querySelector(".weather").style.display= "block"
    document.querySelector(".error").style.display= "none";
 // console.log(result);
    document.querySelector(".city").innerHTML= result.name;
    document.querySelector(".temprature").innerHTML= Math.round(result.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML= result.main.humidity + "%";
    document.querySelector(".wind").innerHTML= result.wind.speed + "km/h";

  //change my weather picture compared to the result
    if(result.weather[0].main =="Clouds"){
      weatherIcon.src ="weather-img/clouds.png"
    }
    else if(result.weather[0].main =="Clear"){
      weatherIcon.src ="weather-img/clear.png"
    }
    else if(result.weather[0].main =="Drizzle"){
      weatherIcon.src ="weather-img/drizzle.png"
    }
    else if(result.weather[0].main =="Rain"){
      weatherIcon.src ="weather-img/rain.png"
    }
    else if(result.weather[0].main =="Mist"){
      weatherIcon.src ="weather-img/mist.png"
    }
    else if(result.weather[0].main =="Snow"){
      weatherIcon.src ="weather-img/snow.png"
    }
    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display= "none";
  }
}

//change result by clicking the button
searchBtn.addEventListener("click", ()=>{
  checkweather(searchInput.value)
})

//change result by Enter on the button
document.addEventListener("keydown", (event) => {
  if (event.key == "Enter")
  checkweather(searchInput.value)
});


//(insomnia)https://api.openweathermap.org/data/2.5/weather?units=metric&q=tehran&apikey=c4469ecbd18e75a602305e38b08651eb

//(api)https://openweathermap.org/api
