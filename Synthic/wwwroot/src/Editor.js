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

let ytPlayer = undefined;
let startPlaying = async (id) => {
    
    ytPlayer = YouTubePlayer('player',{
        videoId: id,
        width: '100%',
        height: '100%'
    });

    let fixPlayerInterval = setInterval(() => {
        let playerElem = document.querySelector('#player[src]');
        
        console.log('Searching for Player...')
        
        if(!playerElem)
            return;

        console.log('Player found!')
        
        playerElem.setAttribute('credentialless', '');
        playerElem.setAttribute('anonymous', '');
        playerElem.src += '';
        playerElem.style.setProperty('visibility', 'visible');
        clearInterval(fixPlayerInterval);
        
        // The player is now TRULY ready
        ytPlayer.on('ready', (e) => {
            ytPlayer.setVolume(10);
            ytPlayer.playVideo();
        })
        
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
    }, 10);
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

let buildMarker = (type) => {
    let marker = document.createElement('div');
    marker.classList.add('marker');
    
    if(type === 'large') {
        marker.classList.add('large-marker');
    }
    
    if(type === 'medium') {
        marker.classList.add('medium-marker');
    }
    
    if(type === 'small') {
        marker.classList.add('small-marker');
    }
    
    return marker;
}

let timeline = document.querySelector('.timeline');
let cursor = document.querySelector('.cursor');
let cursorTimestamp = document.querySelector('.timestamp');

let numLargeMarkers = 3;
let deltaLarge = 100 / (numLargeMarkers + 1);
for(let i = 0; i < (100 - deltaLarge); i += deltaLarge) {
    let marker = buildMarker('large');
    marker.style.setProperty('left', `${i + deltaLarge}%`);
    timeline.appendChild(marker);
}

let numMediumMarkers = (numLargeMarkers * 2) + 1;
let deltaMedium = 100 / (numMediumMarkers + 1);
for(let i = 0; i < (100 - deltaMedium); i += deltaMedium) {
    let marker = buildMarker('medium');
    marker.style.setProperty('left', `${i + deltaMedium}%`);
    timeline.appendChild(marker);
}

let numSmallMarkers = (numMediumMarkers * 2) + 1;

let deltaSmall = 100 / (numSmallMarkers + 1);
for(let i = 0; i < (100 - deltaSmall); i += deltaSmall) {
    let marker = buildMarker('small');
    marker.style.setProperty('left', `${i + deltaSmall}%`);
    timeline.appendChild(marker);
}

timeline.addEventListener('mousemove', (e) => {
    let percentage = e.clientX / timeline.getBoundingClientRect().width;
    cursor.style.setProperty('left', (percentage * 100) + "%")
    let timestampText = secondsToMMSS(Math.round(TrackData.Duration * percentage));
    cursorTimestamp.innerText = timestampText;
});


let colors = ['#FFE74C', '#FF5964', '#777DA7', '#6BF178', '#35A7FF']
let buildChapters = (selectorMode) => {
    let tracks = Album.Tracks;
    let duration = Album.DurationInSeconds;
    document.querySelectorAll('.chapter').forEach(x => x.remove());
    let index = 0;
    tracks.forEach(track => {
       let elem = document.createElement('div');
       elem.classList.add('chapter');
       if(selectorMode)
           elem.classList.add('selectable');
       console.log(`[START] ${track.Metadata.Title}: ${track.StartInSeconds} / ${duration}`)
       console.log(`[DURAT] ${track.Metadata.Title}: ${track.StartInSeconds} / ${duration}`)
       let left = track.StartInSeconds / duration * 100;
       let width = track.DurationInSeconds / duration * 100;
       elem.style.setProperty('left', `${left}%`);
       elem.style.setProperty('width', `${width}%`);
       elem.style.setProperty('background', colors[index++ % colors.length]);
       elem.innerText = track.Metadata.Title;
       elem.setAttribute('track-uuid', track.UUID)
       timeline.appendChild(elem);
    });
}

timeline.addEventListener('mousedown', (e) => {
    let chapters = document.querySelectorAll('.chapter');
    let selectedChapterPrevious = undefined;
    let selectedChapterNext = undefined;
    chapters.forEach(chapter => {
        let bounds = chapter.getBoundingClientRect();
        bounds.right = bounds.left + bounds.width;
        bounds.bottom = bounds.top + bounds.height;

        if(Math.abs(bounds.left - e.clientX) < 15 && e.clientY > bounds.top && e.clientY < bounds.bottom)
            selectedChapterNext = chapter;

        if(Math.abs(bounds.right - e.clientX) < 15 && e.clientY > bounds.top && e.clientY < bounds.bottom)
            selectedChapterPrevious = chapter;
    });
    console.log('PREVIOUS: ', selectedChapterPrevious);
    console.log('NEXT: ', selectedChapterNext);
});