const getWeatherData = async (city) =>{
     const url =  ('https://api.openweathermap.org/data/2.5/weather?q=')
     const apiKey = 'd8de779b70527bed9a82ee7af76c9e9f'
     const reastApi = `${url}${city}&appid=${apiKey}&units=metric`
     const res = await fetch(reastApi)
     if (res.status === 404) {
        const erorrPage = document.getElementById('errorPage')
        erorrPage.classList.remove('hidden',true)
        const displayContainer = document.getElementById('display-container')
        displayContainer.classList.add('hidden')      
     }
     else{
      const erorrPage = document.getElementById('errorPage')
      erorrPage.classList.add('hidden') 
      const displayContainer = document.getElementById('display-container')
      displayContainer.classList.remove('hidden',true)
     }
     const data = await res.json()
     displayData(data)
    
}

function imageSet (data){
     if (data?.weather[0]?.main == 'Clouds') {
       return `<img class="w-24 mx-auto" src="./cloudy.png" alt="">`
     }
     else if (data.weather[0].main == 'Clear') {
      return `<img class="w-24 mx-auto" src="./clear.png" alt="">`
     }

     else if (data.weather[0].main == 'Haze') {
      return `<img class="w-24 mx-auto" src="./haze.png" alt="">`
     }
     else if (data.weather[0].main == 'Rain') {
      return `<img class="w-24 mx-auto" src="./rain.png" alt="">`
     }
}

//sunriseConvert
const sunriseConvert = (data)=>{
const timestamp = data.sys.sunrise
  
// Unix timestamp in seconds
const date = new Date(timestamp * 1000);
let getHour = date.getHours();
let hour1 = getHour > 12? getHour - 12 : getHour
const hour = hour1 === 0? hour1+12:hour1
const hours = hour <10? '0'+hour:hour
const minutes = date.getMinutes();
const formattedDateTime = `${hours}:${minutes}PM`
return formattedDateTime
}


// //sunriseConvert
const sunsetConvert = (data)=>{
const timestamp = data.sys.sunset
  
// Unix timestamp in seconds
const date = new Date(timestamp * 1000);
let getHour = date.getHours();
let hour1 = getHour > 12? getHour - 12 : getHour
const hour = hour1 === 0? hour1+12:hour1
const hours = hour <10? '0'+hour:hour
const minutes = date.getMinutes();
const formattedDateTime = `${hours}:${minutes}PM`
return formattedDateTime
}



const displayData= (data) =>{
    const enviroment = imageSet(data)
    const sunrise = sunriseConvert(data)
    const sunset = sunsetConvert(data)
    const cardContainer = document.getElementById('display-container')
    cardContainer.innerHTML = ''
    const card = document.createElement('div')
    card.innerHTML = `
    <p class="text-3xl mb-3 font-light text-white tracking-widest font-sans uppercase"><i class="fa-solid fa-location-dot text-[#fa983a] fa-md"></i> ${data.name}</p>
    ${enviroment}
    <p class="text-xl font-light text-white tracking-widest font-sans uppercase">${data?.weather[0]?.main}</p>
    <h1 class="text-5xl mt-7 text-white">${data.main.temp = Number ? Math.round(data.main.temp):data.main.temp}<sup>°</sup>C</h1>

     <h1 class='text-white mt-1'>Feels Like: ${data.main.feels_like = Number ? Math.round(data.main.feels_like):data.main.feels_like}<sup>°</sup>C</h1>

    <p class= "text-2xl mt-5">
      <div style="background: #373B44;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #4286f4, #373B44);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #4286f4, #373B44); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      border-radius: 20px;
      "  class="flex p-2 mx-2 bg-[#001026] text-white justify-center gap-x-6">
      <div class="flex">
            <img src="./noun-humidity-151847 1.svg" alt="">
            <span class="-ml-1">${data.main.humidity}%</span>
        </div>
        <div class="flex">
        <img src="./pressure.png" alt=""> 
            <p>${data.main.pressure}</p>
        </div>
          
          <div class="flex">
            <img src="./noun-wind-4507827 1.svg" alt="">
            <p>${data.wind.speed = Number ? Math.round(data.wind.speed):data.wind.speed}km/h</p> 
        </div>
      </div>
    </p>

    <div class="max-w-xs text-center mx-6 mt-6">
     <div class="flex text-white justify-center text-2xl gap-10"><h1>Sunrise</h1>
        <h1>SunSet</h1>
    </div>
    <div class="flex justify-center gap-10 ">
    <div class="text-white text-base tracking-widest">${sunrise}</div>
    <div class="text-white text-base tracking-widest">${sunset}</div>
    </div>
 
    </div>
    
    `
    cardContainer.appendChild(card)
   
}


const searchButton = ()=>{
    const searchInputValue = document.getElementById('searchInput')
    const searchInput = searchInputValue.value 
    const city = searchInput
    getWeatherData(city)
    searchInputValue.value = ''
}



getWeatherData('bogra')
