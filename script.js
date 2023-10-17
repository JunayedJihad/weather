let form = document.getElementById("form");
let today = new Date();
let presentDate = today.toDateString();

form.onsubmit = async function (e) {
  e.preventDefault();
  let city = document.getElementById("input").value.toLowerCase();
  city = city.split(" ");
  city = city.join("+");

  console.log(city);

  const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=66aadee92cc5489c88cc00ac29627ef8`;

  try {
    let response = await fetch(link);
    let data = await response.json();
    if (data.cod >= 400) {
      throw new Error(data.message);
    }

    console.log(data);

    let weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    document.getElementById("weatherIcon").src = `${weatherIcon}`;
    document.getElementById("temp").innerHTML = `${data.main.temp.toFixed(
      1
    )}°C`;
    document.getElementById("weather").innerHTML = `${data.weather[0].main}`;
    document.getElementById(
      "location"
    ).innerHTML = `${data.name},${data.sys.country}`;
    document.getElementById("lat").innerHTML = `Latitude: ${lat.toFixed(2)}°`;
    document.getElementById("lon").innerHTML = `Longitude: ${lon.toFixed(2)}°`;
    document.getElementsByClassName("today").innerHTML = `${presentDate}`;
    document.getElementById(
      "humidity"
    ).innerHTML = `Humidity: ${data.main.humidity}%`;
    document.getElementById("pressure").innerHTML = `Pressure: ${(
      (data.main.pressure * 100) /
      101325
    ).toFixed(2)} atm`;

    document.getElementById("input").value = "";
  } catch (error) {
    document.getElementById("input").value = "";
    alert(error)
  }
};
