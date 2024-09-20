const WEATHER_ID = "4765c80cbfb0193f664ed7e57fa3b027";
const DEFAULT_VALUE = "--";
const searchInput = document.getElementById("search-input");
const cityName = document.querySelector(".city-name");
const weatherState = document.querySelector(".weather-state");
const weatherIcon = document.querySelector(".weather-icon > .icon");
const weatherTerm = document.querySelector(".weather-temperature > .temp");

searchInput.addEventListener("change", (e) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value.trim()}&appid=${WEATHER_ID}&units=metric&lang=vi`
  )
    .then(async (res) => {
      const data = await res.json();
      console.log("[Search Input]", data);

      cityName.innerHTML = data.name || DEFAULT_VALUE;
      weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
      weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      weatherTerm.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;
    })
    .catch(() => {
      alert("Xin nhập lại tên Thành Phố");
    });
});
