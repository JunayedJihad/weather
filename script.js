let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let form = document.getElementById("form");
let today = new Date();
let presentDate = today.toDateString();



form.onsubmit=function  (e) {
  e.preventDefault();
  let city = document.getElementById("input").value.toLowerCase();
  city = city.split(" ");
  city = city.join("+");

  console.log(city);

  const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=66aadee92cc5489c88cc00ac29627ef8`;

  let update = async () => {
    let response = await fetch(link);
    let data = await response.json();

    console.log(data);

    let weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let lat = data.coord.lat;
    let lon = data.coord.lon;

    document.getElementById("body").innerHTML = `<div class="weather-card">
      <div class="weather-img">
        <img src="${weatherIcon}" alt="">
      </div>
      <div class="loc_temp">
        <span id="temp">${data.main.temp.toFixed(1)}°C</span>
        <h5 id="weather">${data.weather[0].main}</h5>
        <h3 id="location">${data.name},${data.sys.country}</h3>
      </div>
      <div class="position mt-3">
        <span>Latitude: ${lat.toFixed(2)}°</span>
        <span>Longitude: ${lon.toFixed(2)}°</span>
      </div>
      <form id="form" class="form" onsubmit="updateWeather()">
        <input type="text" class="form-control my-4" id="input" placeholder="Enter City" />
      </form>
      <div class="date_time">
        <p class="text-center ">${presentDate}</p>
      </div>
      <div class="hum_sunrise">
        <span>Humidity: ${data.main.humidity}%</span>
        <span>Pressure: ${((data.main.pressure * 100) / 101325).toFixed(
          2
        )} atm </span>
      </div>

    </div>`;
    document.getElementById("input").value = "";
  };

  update();

};
