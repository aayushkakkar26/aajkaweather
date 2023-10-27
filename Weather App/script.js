const apiKey="a0885e8b1eed39e82912463010126689";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let searchinp = document.querySelector(".search input")
let searchbtn = document.querySelector(".search button")
const weathericon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiurl + city + `&appid=${apiKey}`)

    if(response.status == 404)
    {
        document.querySelector(".error").style.display="block";
    }
    else{
        var data = await response.json()

    

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        
        var timestamp = data.sys.sunrise;
        var date = new Date(timestamp*1000)
        var formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.querySelector(".rise").innerHTML = formattedTime;
        
        var timestamp = data.sys.sunset;
        var date = new Date(timestamp*1000)
        var formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.querySelector(".set").innerHTML = formattedTime;
    
        if(data.weather[0].main == "Clouds"){
            weathericon.src = "images/cloudy.png"
        }
        if(data.weather[0].main == "Rain"){
            weathericon.src = "images/rainy-day.png"
        }
        if(data.weather[0].main == "Snow"){
            weathericon.src = "images/snow.png"
        }
        if(data.weather[0].main == "Clear"){
            weathericon.src = "images/sun.png"
        }
        if(data.weather[0].main == "Storm"){
            weathericon.src = "images/storm.png"
        }
        if(data.weather[0].main == "Haze"){
            weathericon.src = "images/haze.png"
        }
        
        document.querySelector(".weather").style.display = "block"; 
        document.querySelector(".error").style.display="none";

    }

   


}

searchbtn.addEventListener("click",()=>{
    checkWeather(searchinp.value);
})
searchinp.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchbtn.click(); // Trigger the search button click event
    }
});
