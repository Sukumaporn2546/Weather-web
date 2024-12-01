const iconElement = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

let input = document.getElementById("search");
let city ="";
let latitude = 0.0;
let longitude = 0.0;

input.addEventListener("keyup", function(event){ //keyup เป็นเหตุการณ์ที่เกิดเมื่อผู้ใช้กดปุ่มใดๆ บนคีย์บอร์ดแล้วปล่อยขึ้น
    console.log("key pressed: "+ event.key);
    if(event.key === 'Enter'){
        event.preventDefault();
        city = input.value
        getSearchWeather(city);
        console.log(city);
    }
})
const weather = {}
weather.temperature = {
    unit: "celsius"
}

const KELVIN = 273;
const key = "44770772e559b52b5bb5ffd7b2c16cce";
if("geolocation" in navigator){ //navigator คือ object ข้อมูลเกี่ยวกับ browser ของ user รองรับ geolocation ไหม
    navigator.geolocation.getCurrentPosition(setPosition , showError) //ขอเข้าถึงตำแหน่งชอง user รออนุญาต allow do setPosition, don't allow do showError
}
else{
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p>Browser does not support geolocation</p>`;
}

function setPosition(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

locationIcon.addEventListener('click', function(event){
    console.log('hey');
    getWeather(latitude, longitude);
})

function showError(error){
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<p>${error.message}</p>`
}


function getSearchWeather(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    
    fetch(api)
    .then((response)=>{
        let data = response.json()
        return data
    })
    // .then(function (response){
    //     let data = response.json()
    //     console.log(data)
    //     return data
    // })
    .then(function (data){
        weather.temperature.value = Math.floor(data.main.temp -KELVIN)
        weather.description = data.weather[0].description
        weather.iconId =data.weather[0].icon
        weather.city = data.name
        weather.country = data.sys.country
        console.log(weather.icon)
    })
    .then( () =>{
        displayWeather();
    })
}  

getWeather = (latitude, longitude) => {

    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    fetch(api)
    .then(function (response){
        let data = response.json()
        console.log(data)
        return data
    })
    .then(function (data){
        weather.temperature.value = Math.floor(data.main.temp -KELVIN)
        weather.description = data.weather[0].description
        weather.iconId =data.weather[0].icon
        console.log(data.weather[0].icon); // ตรวจสอบไอคอนที่มาจาก API

        weather.city = data.name
        weather.country = data.sys.country
    })
    .then( () =>{
        displayWeather();
    })
}

displayWeather = ()=>{
    iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.iconId}@2x.png"/>`
    tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`
    descElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
    

}