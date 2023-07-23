const speedUp = document.getElementById('speedUp');
const speedDown = document.getElementById('speedDown');
const tachoUp = document.getElementById('tachoUp');
const tachoDown = document.getElementById('tachoDown');
const leftSign = document.getElementById('leftSign');
const rightSign = document.getElementById('rightSign');
const dippedBeam = document.getElementById('dippedBeam');
const brake = document.getElementById('brake');
const highBeam = document.getElementById('highBeam');
const lock = document.getElementById('lock');
const seatBelt = document.getElementById('seatBelt');
const trunk = document.getElementById('trunk');
const bonnet = document.getElementById('bonnet');
const doors = document.getElementById('doors');
const scroll = $("#scroll");
const playerContainer = $("#playerContainer");
const mapContainer = $("#mapContainer");
const rightContainer = $("#rightContainer");
const leftScreen = $("#leftScreen");
const rightScreen = $("#rightScreen");
const map = $("#map");
const clock = $("#clockContainer");
const gear = $("#gear");
const nowPlaying = document.getElementsByClassName("nowPlaying")[0];
const songArt = document.getElementsByClassName("songArt")[0];
const songName = document.getElementsByClassName("songName")[0]
const songArtist = document.getElementsByClassName("songArtist")[0];
const playpause_btn = document.getElementsByClassName("playPauseSong")[0];
const next_btn = document.getElementsByClassName("nextSong")[0];
const prev_btn = document.getElementsByClassName("prevSong")[0];
const seekSlider = document.getElementsByClassName("seekSlider")[0];
const currentTime = document.getElementsByClassName("currentTime")[0];
const totalDuration = document.getElementsByClassName("totalDuration")[0];
const currentSong = document.createElement("audio");
const time = $("#time");
const settingsButton = document.getElementById("settingsButton");
const container = document.getElementsByClassName('container')[0]
const temperatureContainer = document.getElementsByClassName('temperatureContainer')[0]
const goBackButton = document.getElementById('goBack')
const emojiValue = document.querySelector(".emoji");
const temperatureCount = document.querySelector(".temperatureCount");
const slider = document.querySelector(".sliderTemp");
const airConditioning = document.querySelector('.ac');

let index = 0;
let isPlaying = false;
let updateTimer;
let speed = 0;
let tacho = 0;
let gas = 0.4;
const mileage = 1000;

let turnSignalsStates = {
    'left':  false,
    'right': false
}

let iconsStates = {
    'dippedBeam': 1,
    'brake':      1,
    'drift':      1,
    'highBeam':   1,
    'lock':       1,
    'seatBelt':   1,
    'engineTemp': 2,
    'stab':       1,
    'abs':        1,
    'gas':        2,
    'trunk':      1,
    'bonnet':     1,
    'doors':      1,
    'battery':    0,
    'oil':        0,
    'engineFail': 0
}

const songsList = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3",
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3",
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },
];

function redraw() {
    draw(speed, tacho, gas, mileage, turnSignalsStates, iconsStates);
}

init();
handleScroll();

function init() {
  handleClock();
  scroll.addClass("scrollTop");
  mapContainer.remove();
}

function handleClock() {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  if (minute < 10) minute = `0${minute}`;
  if (second < 10) second = `0${second}`;
  time.text(`${hour} : ${minute} : ${second}`), setTimeout(handleClock, 1000);
}

function handleScroll() {
  scroll.on("click", () => {
    if (rightContainer.has(playerContainer).length) {
      setTimeout(() => {
        playerContainer.remove();
        rightContainer.append(mapContainer);
      }, 200);
    } else {
      playerContainer.removeClass("fade-in");
      mapContainer.addClass("fade-in");
      setTimeout(() => {
        mapContainer.remove();
        rightContainer.append(playerContainer);
      }, 200);
    }
  });
}

function openTemperatureDialog() {
    container.style.display = 'none'
    temperatureContainer.style.display = 'inline-flex'
}

function returnToTheDashboard() {
  container.style.display = 'grid'
    temperatureContainer.style.display = 'none'
}

settingsButton.addEventListener('click', () => openTemperatureDialog())

goBackButton.addEventListener('click', () => returnToTheDashboard())

speedUp.addEventListener('click', () => {
  if(speed < 1)
    speed += 0.05;
    redraw();
});

speedDown.addEventListener('click', () => {
  if(speed > 0.05)
    speed -= 0.05;
    redraw();
});

tachoUp.addEventListener('click', () => {
  if(tacho < 1)
  tacho += 0.05;
    redraw();
});

tachoDown.addEventListener('click', () => {
  if(tacho > 0.05)
  tacho -= 0.05;
    redraw();
});

leftSign.addEventListener('click', () => {
  if(turnSignalsStates.left)
    {turnSignalsStates.left = false;}
    else turnSignalsStates.left = true
    redraw();
});

rightSign.addEventListener('click', () => {
  if(turnSignalsStates.right)
  {turnSignalsStates.right = false;}
  else turnSignalsStates.right = true
    redraw();
});

dippedBeam.addEventListener('click', () => {
  if(iconsStates.dippedBeam === 1)
    iconsStates.dippedBeam = 0;
    else
    iconsStates.dippedBeam = 1;
    redraw();
});

brake.addEventListener('click', () => {
  if(iconsStates.brake === 1){
    iconsStates.brake = 0;
  } else {
    iconsStates.brake = 1;
  }
    redraw();
});

highBeam.addEventListener('click', () => {
  if(iconsStates.highBeam === 1)
   {iconsStates.highBeam = 0;}
    else
    {iconsStates.highBeam = 1;}
    redraw();
});

lock.addEventListener('click', () => {
  if(iconsStates.lock === 1)
   {iconsStates.lock = 0;}
    else
    {iconsStates.lock = 1;}
    redraw();
});

seatBelt.addEventListener('click', () => {
  if(iconsStates.seatBelt === 1){
    iconsStates.seatBelt = 0;
  } else {
    iconsStates.seatBelt = 1;
  }
    redraw();
});

trunk.addEventListener('click', () => {
  if(iconsStates.trunk === 1){
    iconsStates.trunk = 0;
  } else {
    iconsStates.trunk = 1;
  }
    redraw();
});

bonnet.addEventListener('click', () => {
  if(iconsStates.bonnet === 1){
    iconsStates.bonnet = 0;
  } else {
    iconsStates.bonnet = 1;
  }
    redraw();
});

doors.addEventListener('click', () => {
  if(iconsStates.doors === 1){
    iconsStates.doors = 0;
  } else {
    iconsStates.doors = 1;
  }
    redraw();
});

redraw();

function loadSong(index) {
  clearInterval(updateTimer);
  resetValues();

  currentSong.src = songsList[index].path;
  currentSong.load();

  songArt.style.backgroundImage = "url(" + songsList[index].image + ")";
  songName.textContent = songsList[index].name;
  songArtist.textContent = songsList[index].artist;
  nowPlaying.textContent = "PLAYING " + (index + 1) + " OF " +songsList.length;

  updateTimer = setInterval(seekUpdate, 1000);
  currentSong.addEventListener("ended", nextSong);
  randomBackgroundColor();
}

function randomBackgroundColor() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  document.body.style.background = bgColor;
}

function resetValues() {
  currentTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}

function playpauseSong() {
  if (!isPlaying) playSong();
    else pauseSong();
}

function playSong() {
  currentSong.play();
  isPlaying = true;
}

function pauseSong() {
  currentSong.pause();
  isPlaying = false;
}

function nextSong() {
  if (index < songsList.length - 1) index += 1;
  else index = 0;
  loadSong(index);
  playSong();
}

function prevSong() {
  if (index > 0) index -= 1;
  else index = songsList.length;
  loadSong(index);
  playSong();
}

function seekTo() {
  seekTo = currentSong.duration * (seekSlider.value / 100);
  currentSong.currentTime = seekTo;
  }

function seekUpdate() {
  let seekPosition = 0;

  seekPosition = currentSong.currentTime * (100 / currentSong.duration);
  seekSlider.value = seekPosition;

  let currentMinutes = Math.floor(currentSong.currentTime / 60);
  let currentSeconds = Math.floor(currentSong.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(currentSong.duration / 60);
  let durationSeconds = Math.floor(currentSong.duration - durationMinutes * 60);

  if (currentSeconds < 10) {
    currentSeconds = "0" + currentSeconds;
  }
  if (durationSeconds < 10) {
    durationSeconds = "0" + durationSeconds;
  }
  if (currentMinutes < 10) {
    currentMinutes = "0" + currentMinutes;
  }
  if (durationMinutes < 10) {
    durationMinutes = "0" + durationMinutes;
  }

  currentTime.textContent = currentMinutes + ":" + currentSeconds;
  totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  
}

loadSong(index);

document.addEventListener("DOMContentLoaded" , () => {
  document.addEventListener('input',() => {
    const sliderValue = slider.value;
    temperatureCount.textContent = sliderValue;
    if(sliderValue >= 0 && sliderValue <= 8 ){
      emojiValue.textContent = "🥶";
    }
    else if(sliderValue>8 && sliderValue<=16){
      emojiValue.textContent = "😨";
    }
    else if(sliderValue>16 && sliderValue<=24){
      emojiValue.textContent = "😄";
    }
    else if(sliderValue>24 && sliderValue<=32){
      emojiValue.textContent = "😰";
    }
    else if(sliderValue>32 && sliderValue<=40){
      emojiValue.textContent = "🥵";
    }
                            
  });
});

airConditioning.addEventListener('click', () => {
  if(airConditioning.style.background != 'rgb(85, 85, 85)') {
    airConditioning.style.background = '#555555';
    airConditioning.style.color = 'white'
    airConditioning.textContent = 'TURN AIR CONDITIONING ON'
  } else {
    airConditioning.style.background = '#BCF1EE';
    airConditioning.style.color = 'black'
    airConditioning.textContent = 'TURN AIR CONDITIONING OFF'
}

}) 
