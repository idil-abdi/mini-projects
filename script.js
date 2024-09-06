let counterNum = 0;
const counterDisplay =  document.querySelector('.counter-display')
const counterBtns = document.querySelectorAll('.counter-btn');
counterBtns.forEach((counterbtn) => {
  counterbtn.addEventListener('click', (e) => {
    const styles = e.currentTarget.classList;
    if (styles.contains('decrease')) {
      counterNum--
    } else if (styles.contains('increase')) {
      counterNum++
    } else {
      counterNum = 0
    }
    counterDisplay.textContent = counterNum;
    if (counterNum > 0) {
      counterDisplay.style.color = "green";
    } else if (counterNum < 0) {
      counterDisplay.style.color = "red";
    } else {
      counterDisplay.style.color = "white";
    }
  })
})


//rock paper scissors
let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    loses: 0,
    tie: 0,
};

updateScoreElement();

  let isAutoPlaying = false;

  let intervalId;

  function autoPlay() {
    if (!isAutoPlaying) {
      intervalId = setInterval(function() {
        const playerMove = pickComputerMove()
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }

  function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = "";

    if (playerMove === "scissors") {
      if (computerMove === "rock") {
        result = "Lose.";
      } else if (computerMove === "paper") {
        result = "Win.";
      } else if (computerMove === "scissors") {
        result = "Tie.";
      }
    } else if (playerMove === "paper") {
      if (computerMove === "rock") {
        result = "Win.";
      } else if (computerMove === "paper") {
        result = "Tie.";
      } else if (computerMove === "scissors") {
        result = "Lose.";
      }
    } else if (playerMove === "rock") {
      if (computerMove === "rock") {
        result = "Tie.";
      } else if (computerMove === "paper") {
        result = "Lose.";
      } else if (computerMove === "scissors") {
        result = "Win.";
      }
    }

    if (result === "Win.") {
      score.wins += 1;
    } else if (result === "Lose.") {
      score.loses += 1;
    } else if (result === "Tie.") {
      score.tie += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));

    updateScoreElement();

    document.querySelector(".js-result").innerHTML = result;

    document.querySelector(".js-moves").innerHTML = `You
  <img src="./img/${playerMove}-emoji.png" alt="rock" class="move-icon" />
  <img src="./img/${computerMove}-emoji.png" alt="paper" class="move-icon" />
  Computer`;
  }

  function updateScoreElement() {
    let scorebtn = document.querySelector(".js-score");
    scorebtn.innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.tie}.`;
  }

  function pickComputerMove() {
    const randomNum = Math.random();

    let computerMove = "";

    if (randomNum >= 0 && randomNum < 1 / 3) {
      computerMove = "rock";
    } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
      computerMove = "paper";
    } else if (randomNum >= 2 / 3 && randomNum < 1) {
      computerMove = "scissors";
    }

    return computerMove;
  }
  
// jokes
const jokesContainer = document.getElementById('jokes')
const btn = document.querySelector('.jokes-btn');

const url = 'https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8ecef55232mshfd797077303d2b8p1ea2b2jsn77d2ba0e86e5',
		'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com'
	}
};

let jokes = async () => {
    try {
    const response = await fetch(url, options);
    const result = await response.json();
    jokesContainer.textContent = `${result[0].joke}`;
    } catch (error) {
        console.error(error);
    }
}

btn.addEventListener('click', jokes);
jokes();

// weather app
const apiKey = '7b6a6f9b787cac1ee11807f1b7294359'
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const weatherSearchBox = document.querySelector('.weather-search input')
const weatherSearchBtn = document.querySelector('.weather-search button')
const weatherIcon = document.querySelector('.weather-icon')


async function checkWeather(city) {
  const response = await fetch(apiUrl + city +`&appid=${apiKey}`) ;
  let data = await response.json();
  console.log(data);
  
  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp)  +'°C';
  document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
  document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

  if(data.weather[0].main == 'Clouds'){
    weatherIcon.src = './img/clouds.png'
  } else if (data.weather[0].main == 'Clear'){
    weatherIcon.src = './img/clear.png'
  } else if (data.weather[0].main == 'Rain'){
    weatherIcon.src = './img/rain.png'
  } else if (data.weather[0].main == 'Drizzle'){
    weatherIcon.src = './img/drizzle.png'
  } else if (data.weather[0].main == 'Mist'){
    weatherIcon.src = './img/mist.png'
  }

  document.querySelector('.weather').style.display = 'block'
}

weatherSearchBtn.addEventListener('click', function() {
  checkWeather(weatherSearchBox.value); 
})

// password generator
const passwordGeneratorBtn = document.querySelector('.generator-btn');
const passwordInput = document.getElementById('input');
const passwordCopyIcon = document.querySelector('.copy-icon');

passwordGeneratorBtn.addEventListener('click', () => {
  createPassword();
})

passwordCopyIcon.addEventListener('click', () => {
  copyPassword();
})

function createPassword() {
  const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghjiklmnopqrstuvwxyz';
  const passwordLength = 10;
  let password =''

  for (let i = 0; i < passwordLength; i++) {
    const randonNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randonNumber, randonNumber+1);    
  }
  passwordInput.value = password;
}

function copyPassword() {
  passwordInput.select();
  passwordInput.setSelectionRange(0,9999);
  navigator.clipboard.writeText(passwordInput.value);
}

// age caluculator
const birthdayInput = document.getElementById('birthday');
const ageCalculatingBtn = document.getElementById('age-calculator-btn');
const birthdayResult = document.getElementById('birthday-result');

function ageCalculate() {
  const birthdayValue = birthdayInput.value;
  if (birthdayValue === '') {
    alert('please enter a birthday date');
  } else {
    const age = getAge(birthdayValue);
    birthdayResult.innerText = `Your age is ${age} years old`;
  }  
}

function getAge(birthdayValue) {
  const currentDate = new Date();
  const birthdayDate = new Date(birthdayValue);
  let age = currentDate.getFullYear() - birthdayDate.getFullYear();
  const month = currentDate.getMonth() - birthdayDate.getMonth();

  if (month < 0 || (month === 0 && currentDate.getDate() < birthdayDate.getDate())) {
    age--
  }
  return age;
}

ageCalculatingBtn.addEventListener('click', ageCalculate);

// Calculator App
const calculatorBtn = document.querySelectorAll('.individual-btn');
const calculatorInputField = document.getElementById('calculator-result')

for (let i = 0; i < calculatorBtn.length; i++) {
  calculatorBtn[i].addEventListener('click', () => {
    const buttonValue = calculatorBtn[i].textContent;
    if(buttonValue === 'C') {
      clearResult();
    } else if (buttonValue === '=') {
      calculatorResult();
    } else {
      appendValue(buttonValue);
    }
  })
}

function clearResult() {
  calculatorInputField.value = '';
}
function calculatorResult() {
  calculatorInputField.value = eval(calculatorInputField.value);
}
function appendValue(buttonValue) {
  calculatorInputField.value += buttonValue;
}

// clock app
const hrs = document.getElementById('hrs');
const min = document.getElementById('min');
const sec = document.getElementById('sec');

setInterval(() => {
  const currentTime = new Date();
  hrs.innerHTML = (currentTime.getHours() < 10 ? '0' : '') + currentTime.getHours();
  min.innerHTML = (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();
  sec.innerHTML = (currentTime.getSeconds()< 10 ? '0' : '') + currentTime.getSeconds();
}, 1000)





