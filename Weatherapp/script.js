const wrapper = document.querySelector('.wrapper'),
inputPart = document.querySelector('.input-part'),
inputTxt = inputPart.querySelector('.info-txt'),
inputField = inputPart.querySelector('input'),
locationBtn = inputPart.querySelector('button'),
weatherPart = wrapper.querySelector('.weather-part'),
Icons = weatherPart.querySelector('img'),
arrowBack = wrapper.querySelector('header i');

let api ;

const ApiKey = 'f0b9365aaf9dfdaa8cb6d7888c999664';

inputField.addEventListener('keyup', e => {
    //if user pressed enter btn and input value is not empty
    if(e.key == 'Enter' && inputField.value != ""){
       requestApi(inputField.value);
    }
});

locationBtn.addEventListener('click', () => {
      if(navigator.geolocation){ // if browser support geolocation api
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
      }else{
        alert('Your browser does not support geolocation api');
      }
});

const onSuccess = (position) => {
    const {latitude, longitude} = position.coords;
     api = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&units=metric&appid=${ApiKey}`;
    fetchData();
}


const onError = (error) => {
    inputTxt.innerText = error.message;
    inputTxt.classList.add('error'); 
}

const requestApi = (city) => {
       api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`;
      fetchData();
}

function fetchData(){
    inputTxt.innerText = "Getting weather details...";
    inputTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        inputTxt.innerText = "Something went wrong";
        inputTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){
        inputTxt.classList.replace("pending", "error");
        inputTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        if(id == 800){
            Icons.src = "icon/calm.png";
        }else if(id >= 200 && id <= 232){
            Icons.src = "icon/storm.png";  
        }else if(id >= 600 && id <= 622){
            Icons.src = "icon/snow.png";
        }else if(id >= 701 && id <= 781){
            Icons.src = "icon/wind.png";
        }else if(id >= 801 && id <= 804){
            Icons.src = "icon/clouds.png";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            Icons.src = "icon/rain.jpeg";
        }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        inputTxt.classList.remove("pending", "error");
        inputTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener('click', () => {
    wrapper.classList.remove('active')
});