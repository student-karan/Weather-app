let input = document.querySelector("#weather");
let searchbtn = document.querySelector("#search");
let temp = document.querySelector(".temp");
let description = document.querySelector(".description");
let humidity = document.querySelector("#humidity");
let windspeed = document.querySelector("#wind-speed");
let displaydata = document.querySelector(".display");
let img = document.createElement("img");
displaydata.prepend(img);

let error = document.querySelector(".error");

searchbtn.addEventListener("click",()=>{
    GetWeather(input.value);
})

async function GetWeather(value){
    if (input.value === "") {
        input.placeholder = "You must write something..."
    }
    else {
        try {
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=af8f5159cfb0bb24bda39fedd9ce216d`);
            let data = await res.json()
            console.log(data)
            
            if(data.cod === "404"){
                error.style.display = "flex"
                displaydata.style.display = "none"
                return;
            }
            error.style.display = "none"
            displaydata.style.display = "flex"
            switch(data.weather[0].main){
                case 'Clouds':
                    img.src = `./assets/cloud.png`;
                    break;
                case 'Clear':
                    img.src = `./assets/clear.png`;  
                    break; 
                case 'Snow':
                    img.src = `./assets/snow.png`;   
                    break; 
                case 'Mist':
                    img.src = `./assets/mist.png`;   
                    break;
                case 'Rain':
                    img.src = `./assets/rain.png`;    
                    break;      
            }

            temp.innerHTML = `${(data.main.temp-273.00).toFixed(2)}°C`
            description.innerHTML = `${data.weather[0].description}`


            humidity.innerHTML= ` <i class="fa-solid fa-droplet"></i>
                    <div class="data">
                        <div class="numdata humidity">${data.main.humidity}%</div>
                        <p>Humidity</p>
                    </div>`;

            windspeed.innerHTML= `<i class="fa-solid fa-wind"></i>
                    <div class="data">
                        <div class="numdata wind-speed">${data.wind.speed}m/s</div>
                        <p>Wind Speed</p>
                    </div>`;   
        }
        catch(err){
            console.log(err);
        }
    }

}