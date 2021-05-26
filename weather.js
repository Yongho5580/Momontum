const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const API_KEY = "f3680ce598e56c22001d7137e40b9b3f";

function getWeather (lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function (res) {
        return res.json()
    }).then((json) => {
        const temperature = Math.ceil(json.main.temp);
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`
    })
}

function saveCoords (coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError () {
    console.log("error")
}

function askForCoords () {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords () {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

loadCoords();