import YouTubePlayer from 'youtube-player';

//#region Local Objects

let TrackData = {
    Title: '',
    Author: '',
    Duration: 204
};
window.TrackData = TrackData;

let PlayerState = {
    Track: TrackData,
    Timestamp: 0
};

window.Eval = (code) => {
    console.log("Evaling: " + code);
    return eval(code);
}

let updateControlsHandle = -1;

//#endregion

//#region Media Controls
const progressBar = document.querySelector(".music-progress-bar");
const currentProgress = document.querySelector(".current-progress");
const currentTime = document.querySelector(".current-time");
const songLength = document.querySelector(".song-length");
const playPauseButton = document.querySelector('.playPauseButton');
const currentTrackName = document.querySelector('.track-title');
const currentArtistName = document.querySelector('.track-artist');
const repeatTrackButton = document.querySelector('.repeat-btn');
const currentSongArt = document.querySelector('.track-art');
let repeat = false;
let repeatTo = 0.0;
let repeatFrom = 0.0;
let Album = {};

let secondsToMMSS = (seconds) => {
    return new Date(seconds * 1000).toISOString().slice(seconds >= 3600 ? 11 : 11, 19);
}

progressBar.addEventListener('mouseup', (e) => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let width = rect.width;
    let progress = Math.round(x / width * 100) / 100;
    PlayerState.Timestamp = Math.max(Math.min(TrackData.Duration * progress, TrackData.Duration), 0);
    ytPlayer.seekTo(PlayerState.Timestamp);
    disableRepeat();
    updateProgress();
});

let seek = (time) => {
    PlayerState.Timestamp = time;
    ytPlayer.seekTo(time);
    disableRepeat();
    updateProgress();
}

let lastTime = 0;
let updateProgress = () => {
    if(Math.abs(ytPlayer.getCurrentTime() - lastTime) > 4) {
        updateRepeat();
    }
    lastTime = ytPlayer.getCurrentTime();
    currentProgress.style.setProperty('width', (PlayerState.Timestamp / TrackData.Duration * 100) + '%');
    currentTime.innerText = secondsToMMSS(PlayerState.Timestamp);
    songLength.innerText = secondsToMMSS(TrackData.Duration);
    currentTrackName.innerText = Album.Tracks.filter(x => x.Timestamp <= PlayerState.Timestamp).reverse()[0].Metadata.Title;
    currentArtistName.innerText = Album.Tracks.filter(x => x.Timestamp <= PlayerState.Timestamp).reverse()[0].Metadata.Artist;
    if(repeat) {
        if(PlayerState.Timestamp >= repeatFrom) {
            PlayerState.Timestamp = repeatTo;
            ytPlayer.seekTo(PlayerState.Timestamp);
            updateProgress();
        }
    }
}

let updateRepeat = () => {
    repeatTo = Album.Tracks.filter(x => x.Timestamp <= PlayerState.Timestamp).reverse()[0].Timestamp;
    repeatFrom = Album.Tracks.filter(x => x.Timestamp >= PlayerState.Timestamp)[0].Timestamp;
}

let disableRepeat = () => {
    repeat = false;
    repeatTrackButton.style.setProperty('color', 'white');
}

let enableRepeat = () => {
    repeat = true;
    repeatTrackButton.style.setProperty('color', '#3c50fa');
    updateRepeat();
}

let toggleRepeat = () => {
    repeat = !repeat;
    if(repeat) {
        repeatTrackButton.style.setProperty('color', '#3c50fa');
        updateRepeat();
    }else {
        repeatTrackButton.style.setProperty('color', 'white');
    }
}

repeatTrackButton.addEventListener('mouseup', () => {
    toggleRepeat();
})

playPauseButton.addEventListener('mouseup', async () => {
   let playerState = await ytPlayer.getPlayerState();
   if(playerState === 1) { // Video is playing
       ytPlayer.pauseVideo();
   } else {
       ytPlayer.playVideo();
   }
});

let startControls = () => {
    if(updateControlsHandle === -1) {
        updateControlsHandle = setInterval(controlsTrick, 100);
    }
}

let stopControls = () => {
    if(updateControlsHandle !== -1) {
        clearInterval(updateControlsHandle);
        updateControlsHandle = -1;
    }
}

let controlsTrick = async () => {
    PlayerState.Timestamp = await ytPlayer.getCurrentTime();
    updateProgress();
}

//#endregion

//#region Video Player

let ytPlayer = YouTubePlayer('player');
let startPlaying = async (id) => {
    console.log("ID: ", id);
    console.log(ytPlayer);

    ytPlayer.on('stateChange', async (e) => {
        if(e.data === 1) {
            TrackData.Duration = await ytPlayer.getDuration();
            songLength.innerText = secondsToMMSS(TrackData.Duration);
            startControls();
            playPauseButton.innerText = "⏸";
        } else if(e.data === 2) {
            stopControls();
            playPauseButton.innerText = "▶";
        }
    })
    
    let playerElem = document.querySelector('#player');
    console.log('Reloading player with: ', playerElem);
    playerElem.setAttribute('credentialless', '');
    playerElem.setAttribute('anonymous', '');
    playerElem.src = playerElem.src.replace('/embed/?', `/embed/${id}?`); // Reload the iframe
    ytPlayer.setVolume(25);
    ytPlayer.play();
}


//#endregion


//#region Navigation

let pageSelectors = document.querySelectorAll(".nav-links > a");
pageSelectors.forEach(x => x.addEventListener('mouseup', () => {
    pageSelectors.forEach(c => c.classList.remove('nav-active-page'));
    x.classList.add('nav-active-page');
}))

//#endregion

window.saveAsFile = (fileName, base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(link.href);
};