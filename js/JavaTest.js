/* Looks up DOM nodes to initialize interface */
document.addEventListener('DOMContentLoaded', initialiseWebPage);

/* Function that declares const variables, cannot be reassigned*/
function initialiseWebPage() {
    const myVideo = document.querySelector('video');
    const playButton = document.getElementById("playPause");
    const muteButton = document.getElementById("muteUnmute");
    const scrubSlider = document.getElementById("seekBar");
    const volumeSlider = document.getElementById("volumeBar");
    const currentTimeDisplayed = document.getElementById("currentTimes");
    const returnTimeDisplayed = document.getElementById("returnTime");
    const audioReturn = document.getElementById("audioDisplayElement");
    const playbackSpeed = document.querySelector("select");
	
/* Global variable used in tabAway function */
	let flag;
	
/* Event listeners awaiting for a specific input then calls a second argument */
	playbackSpeed.addEventListener('change', changeSpeed);
    myVideo.addEventListener('timeupdate', displayVideoTimes);
    myVideo.addEventListener('timeupdate', displayAudioLevels);
    playButton.addEventListener('click', playAndPause);
    muteButton.addEventListener('click', muteAndUnmute);
    myVideo.addEventListener('timeupdate', playSlider);
    scrubSlider.addEventListener('input', seekBar);
    volumeSlider.addEventListener('input', audioSlider);
	document.addEventListener('visibilitychange', tabAway);
	document.addEventListener('keydown', ShortcutKeys);
	
	
/* volume key controls awaits for users to press keys W/S adds value to video volume */
	function ShortcutKeys(event) {
  switch (event.key) {
    case "ArrowUp":
    case "W":
    case "w":
	case "keyW":
      if (myVideo.volume < 1) {
        myVideo.volume += 0.1;
        volumeSlider.value = myVideo.volume * 10;
        audioDisplayElement.value = volumeSlider.value;
      } else {
        myVideo.volume = 1;
        volumeSlider.value = 10;
        audioDisplayElement.value = 10;
      }
      break;
  }

  switch (event.key) {
    case "ArrowDown":
    case "S":
    case "s":
	case "keyS":
      if (myVideo.volume > 0) {
        myVideo.volume -= 0.1;
        volumeSlider.value = myVideo.volume * 10;
        audioDisplayElement.value = volumeSlider.value;
      } else {
        myVideo.volume = 0;
        volumeSlider.value = 0;
        audioDisplayElement.value = 0;
        muteButton.innerHTML = "Unmute";
      }
      break;
  }
/* Allows the user to use key P to pause and play the video */
  switch (event.key) {
    case "P":
    case "p":
    case "keyP":
      if (myVideo.paused === true) {
        myVideo.play();
        playButton.innerHTML = "Pause";
      } else {
        myVideo.pause();
        playButton.innerHTML = "Play";
      }
      break;
  }
/* Allows the user to use key M to mute and unmute the video */
  switch (event.key) {
    case "m":
    case "M":
    case "keyM":
      if (myVideo.muted === true) {
        myVideo.muted = false;
        volumeSlider.value = 5;
        audioDisplayElement.value = 5;
        muteButton.innerHTML = "Mute";
      } else {
        myVideo.muted = true;
        volumeSlider.value = 0;
        audioDisplayElement.value = 0;
        muteButton.innerHTML = "Unmute";
      }
      break;
  }
  /* When using A/D keys the value of the current time has 10 seconds added or subtracted. */
  switch (event.key) {
    case "A":
    case "a":
    case "keyA":
	case "ArrowLeft":
      if (myVideo.currentTime > 0) {
        myVideo.currentTime -= 10;
        seekBar.value = myVideo.currentTime * 10;
        displayVideoTimes.value = seekBar.value;
      } else {
        myVideo.currentTime = 0;
        seekBar.value = 0;
      }
      break;
  }
  switch (event.key) {
    case "D":
    case "d":
    case "keyD":
	case "ArrowRight":
      if (myVideo.currentTime > 0) {
        myVideo.currentTime += 10;
        seekBar.value = myVideo.currentTime * 10;
        displayVideoTimes.value = seekBar.value;
      } else {
        myVideo.currentTime = 0;
        seekBar.value = 0;
      }
      break;
  }
}
			
/*Sets speed of the video based on speed value selected by user */
   function changeSpeed() {
         myVideo.playbackRate = playbackSpeed.value;
    }
	
/* Makes use of global variable flag to set different states */
     function tabAway() {
	if(document.visibilityState === "hidden") {
		if (myVideo.paused === true) {
			flag = 1; }
		else {
			flag = 0;
			}
		myVideo.pause();
		playButton.innerHTML = "Play";
	}
	if ((document.visibilityState === "visible") && ( flag == 1)) {
		myVideo.paused = true;
		playButton.innerHTML = "Play";
	}
	if((document.visibilityState === "visible") && (flag == 0)) {
		myVideo.play();
		playButton.innerHTML = "Pause";
	}
	 }
	
/* Controls audio volume container, update the audioDisplayElement based on volume sliders value */
    function displayAudioLevels() {
    audioSlider.value = volumeSlider.value;
	audioDisplayElement.value = volumeSlider.value;

	if(volumeSlider.value >= 1){
		myVideo.muted = false;
	}
}
 
/* Video time stamps, displays the current times and remaining times inside element on the webpage. */
/* let variable is used because currentMinute/second and remainMinute/second will change. */  
 
   function displayVideoTimes() {
        let currentMinute = Math.floor(myVideo.currentTime / 60);
        let currentSecond = Math.floor(myVideo.currentTime % 60);
        let remainMinute = Math.floor((myVideo.duration - myVideo.currentTime) / 60);
        let remainSecond = Math.floor((myVideo.duration - myVideo.currentTime) % 60);
        if (currentMinute < 10) currentMinute = "0" + currentMinute;
        if (currentSecond < 10) currentSecond = "0" + currentSecond;
        if (remainMinute < 10) remainMinute = "0" + remainMinute;
        if (remainSecond < 10) remainSecond = "0" + remainSecond;
        currentTimeDisplayed.value = currentMinute + ":" + currentSecond;
        returnTimeDisplayed.value = remainMinute + ":" + remainSecond;
    }
	
/* Makes use of if statements, when the video is paused it is set to true otherwise false. */
    function playAndPause() {
        if (myVideo.paused === true){
            myVideo.play();
            playButton.innerHTML = "Pause";} 
		else{
            myVideo.pause();
            playButton.innerHTML = "Play";}
			
	 }
	 
	 
/*Mute and unmute button, also volumeSlider value changes based on true or false*/ 
    function muteAndUnmute() {
        if (myVideo.muted === true) {
            myVideo.muted = false;
            volumeSlider.value = 5;
            muteButton.innerHTML = "Mute";
        } else {
            myVideo.muted = true;
            volumeSlider.value = 0;
            muteButton.innerHTML = "Unmute";
        }
	}

/* Updates the seekbar to the correct currentTime based on where the user clicks on the seekbar */
    function seekBar() {
        myVideo.currentTime = scrubSlider.value / 100 * myVideo.duration;
    }

/* Sets the value of scrubSlider to currentTime over duration, this makes the slider move correctly. */
    function playSlider() {
        scrubSlider.value = (myVideo.currentTime / myVideo.duration) * 100;
    }

/*Controls the audio of the video based on what value the volumeSlider is set at.*/
/* Changes mute button accordingly */
    function audioSlider() {
        myVideo.volume = volumeSlider.value / 10;
        if (myVideo.volume === 0) muteButton.innerHTML = "Unmute";
        else muteButton.innerHTML = "Mute";
    }
}
