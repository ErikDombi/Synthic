/*! For license information please see Editor.js.LICENSE.txt */
(()=>{var __webpack_modules__={90:e=>{function t(e,t){e.onload=function(){this.onerror=this.onload=null,t(null,e)},e.onerror=function(){this.onerror=this.onload=null,t(new Error("Failed to load "+this.src),e)}}function r(e,t){e.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,t(null,e))}}e.exports=function(e,a,o){var n=document.head||document.getElementsByTagName("head")[0],l=document.createElement("script");"function"==typeof a&&(o=a,a={}),a=a||{},o=o||function(){},l.type=a.type||"text/javascript",l.charset=a.charset||"utf8",l.async=!("async"in a)||!!a.async,l.src=e,a.attrs&&function(e,t){for(var r in t)e.setAttribute(r,t[r])}(l,a.attrs),a.text&&(l.text=""+a.text),("onload"in l?t:r)(l,o),l.onload||t(l,o),n.appendChild(l)}},988:e=>{"use strict";var t;t=function(){var e={},t={};return e.on=function(e,r){var a={name:e,handler:r};return t[e]=t[e]||[],t[e].unshift(a),a},e.off=function(e){var r=t[e.name].indexOf(e);-1!==r&&t[e.name].splice(r,1)},e.trigger=function(e,r){var a,o=t[e];if(o)for(a=o.length;a--;)o[a].handler(r)},e},e.exports=t},6:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=(a=r(275))&&a.__esModule?a:{default:a};t.default={pauseVideo:{acceptableStates:[o.default.ENDED,o.default.PAUSED],stateChangeRequired:!1},playVideo:{acceptableStates:[o.default.ENDED,o.default.PLAYING],stateChangeRequired:!1},seekTo:{acceptableStates:[o.default.ENDED,o.default.PLAYING,o.default.PAUSED],stateChangeRequired:!0,timeout:3e3}},e.exports=t.default},125:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(r(215)),o=s(r(255)),n=s(r(279)),l=s(r(6));function s(e){return e&&e.__esModule?e:{default:e}}var i=(0,a.default)("youtube-player"),u={proxyEvents:function(e){var t={},r=function(r){var a="on"+r.slice(0,1).toUpperCase()+r.slice(1);t[a]=function(t){i('event "%s"',a,t),e.trigger(r,t)}},a=!0,o=!1,l=void 0;try{for(var s,u=n.default[Symbol.iterator]();!(a=(s=u.next()).done);a=!0)r(s.value)}catch(e){o=!0,l=e}finally{try{!a&&u.return&&u.return()}finally{if(o)throw l}}return t},promisifyPlayer:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r={},a=function(a){t&&l.default[a]?r[a]=function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return e.then((function(e){var t=l.default[a],o=e.getPlayerState(),n=e[a].apply(e,r);return t.stateChangeRequired||Array.isArray(t.acceptableStates)&&-1===t.acceptableStates.indexOf(o)?new Promise((function(r){e.addEventListener("onStateChange",(function a(){var o=e.getPlayerState(),n=void 0;"number"==typeof t.timeout&&(n=setTimeout((function(){e.removeEventListener("onStateChange",a),r()}),t.timeout)),Array.isArray(t.acceptableStates)&&-1!==t.acceptableStates.indexOf(o)&&(e.removeEventListener("onStateChange",a),clearTimeout(n),r())}))})).then((function(){return n})):n}))}:r[a]=function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return e.then((function(e){return e[a].apply(e,r)}))}},n=!0,s=!1,i=void 0;try{for(var u,c=o.default[Symbol.iterator]();!(n=(u=c.next()).done);n=!0){var d=u.value;a(d)}}catch(e){s=!0,i=e}finally{try{!n&&c.return&&c.return()}finally{if(s)throw i}}return r}};t.default=u,e.exports=t.default},275:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={BUFFERING:3,ENDED:0,PAUSED:2,PLAYING:1,UNSTARTED:-1,VIDEO_CUED:5},e.exports=t.default},279:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["ready","stateChange","playbackQualityChange","playbackRateChange","error","apiChange","volumeChange"],e.exports=t.default},255:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["cueVideoById","loadVideoById","cueVideoByUrl","loadVideoByUrl","playVideo","pauseVideo","stopVideo","getVideoLoadedFraction","cuePlaylist","loadPlaylist","nextVideo","previousVideo","playVideoAt","setShuffle","setLoop","getPlaylist","getPlaylistIndex","setOption","mute","unMute","isMuted","setVolume","getVolume","seekTo","getPlayerState","getPlaybackRate","setPlaybackRate","getAvailablePlaybackRates","getPlaybackQuality","setPlaybackQuality","getAvailableQualityLevels","getCurrentTime","getDuration","removeEventListener","getVideoUrl","getVideoEmbedCode","getOptions","getOption","addEventListener","destroy","setSize","getIframe"],e.exports=t.default},62:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=s(r(988)),n=s(r(900)),l=s(r(125));function s(e){return e&&e.__esModule?e:{default:e}}var i=void 0;t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],s=(0,o.default)();if(i||(i=(0,n.default)(s)),t.events)throw new Error("Event handlers cannot be overwritten.");if("string"==typeof e&&!document.getElementById(e))throw new Error('Element "'+e+'" does not exist.');t.events=l.default.proxyEvents(s);var u=new Promise((function(r){"object"===(void 0===e?"undefined":a(e))&&e.playVideo instanceof Function?r(e):i.then((function(a){var o=new a.Player(e,t);return s.on("ready",(function(){r(o)})),null}))})),c=l.default.promisifyPlayer(u,r);return c.on=s.on,c.off=s.off,c},e.exports=t.default},900:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=(a=r(90))&&a.__esModule?a:{default:a};t.default=function(e){return new Promise((function(t){if(window.YT&&window.YT.Player&&window.YT.Player instanceof Function)t(window.YT);else{var r="http:"===window.location.protocol?"http:":"https:";(0,o.default)(r+"//www.youtube.com/iframe_api",(function(t){t&&e.trigger("error",t)}));var a=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=function(){a&&a(),t(window.YT)}}}))},e.exports=t.default},215:(e,t,r)=>{function a(){var e;try{e=t.storage.debug}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e}(t=e.exports=r(46)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},t.formatArgs=function(e){var r=this.useColors;if(e[0]=(r?"%c":"")+this.namespace+(r?" %c":" ")+e[0]+(r?"%c ":" ")+"+"+t.humanize(this.diff),r){var a="color: "+this.color;e.splice(1,0,a,"color: inherit");var o=0,n=0;e[0].replace(/%[a-zA-Z%]/g,(function(e){"%%"!==e&&(o++,"%c"===e&&(n=o))})),e.splice(n,0,a)}},t.save=function(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(e){}},t.load=a,t.useColors=function(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type)||("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},t.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},t.enable(a())},46:(e,t,r)=>{var a;function o(e){function r(){if(r.enabled){var e=r,o=+new Date,n=o-(a||o);e.diff=n,e.prev=a,e.curr=o,a=o;for(var l=new Array(arguments.length),s=0;s<l.length;s++)l[s]=arguments[s];l[0]=t.coerce(l[0]),"string"!=typeof l[0]&&l.unshift("%O");var i=0;l[0]=l[0].replace(/%([a-zA-Z%])/g,(function(r,a){if("%%"===r)return r;i++;var o=t.formatters[a];if("function"==typeof o){var n=l[i];r=o.call(e,n),l.splice(i,1),i--}return r})),t.formatArgs.call(e,l);var u=r.log||t.log||console.log.bind(console);u.apply(e,l)}}return r.namespace=e,r.enabled=t.enabled(e),r.useColors=t.useColors(),r.color=function(e){var r,a=0;for(r in e)a=(a<<5)-a+e.charCodeAt(r),a|=0;return t.colors[Math.abs(a)%t.colors.length]}(e),"function"==typeof t.init&&t.init(r),r}(t=e.exports=o.debug=o.default=o).coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){t.enable("")},t.enable=function(e){t.save(e),t.names=[],t.skips=[];for(var r=("string"==typeof e?e:"").split(/[\s,]+/),a=r.length,o=0;o<a;o++)r[o]&&("-"===(e=r[o].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){var r,a;for(r=0,a=t.skips.length;r<a;r++)if(t.skips[r].test(e))return!1;for(r=0,a=t.names.length;r<a;r++)if(t.names[r].test(e))return!0;return!1},t.humanize=r(680),t.names=[],t.skips=[],t.formatters={}},680:e=>{var t=1e3,r=60*t,a=60*r,o=24*a;function n(e,t,r){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+r:Math.ceil(e/t)+" "+r+"s"}e.exports=function(e,l){l=l||{};var s,i=typeof e;if("string"===i&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var n=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(n){var l=parseFloat(n[1]);switch((n[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*l;case"days":case"day":case"d":return l*o;case"hours":case"hour":case"hrs":case"hr":case"h":return l*a;case"minutes":case"minute":case"mins":case"min":case"m":return l*r;case"seconds":case"second":case"secs":case"sec":case"s":return l*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return l;default:return}}}}(e);if("number"===i&&!1===isNaN(e))return l.long?n(s=e,o,"day")||n(s,a,"hour")||n(s,r,"minute")||n(s,t,"second")||s+" ms":function(e){return e>=o?Math.round(e/o)+"d":e>=a?Math.round(e/a)+"h":e>=r?Math.round(e/r)+"m":e>=t?Math.round(e/t)+"s":e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](r,r.exports,__webpack_require__),r.exports}__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var r in t)__webpack_require__.o(t,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var __webpack_exports__={};(()=>{"use strict";var youtube_player__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(62),youtube_player__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(youtube_player__WEBPACK_IMPORTED_MODULE_0__);let TrackData={Title:"",Author:"",Duration:204};window.TrackData=TrackData;let PlayerState={Track:TrackData,Timestamp:0};window.Eval=code=>(console.log("Evaling: "+code),eval(code));let updateControlsHandle=-1;const progressBar=document.querySelector(".music-progress-bar"),currentProgress=document.querySelector(".current-progress"),currentTime=document.querySelector(".current-time"),songLength=document.querySelector(".song-length"),playPauseButton=document.querySelector(".playPauseButton"),currentTrackName=document.querySelector(".track-title"),currentArtistName=document.querySelector(".track-artist"),repeatTrackButton=document.querySelector(".repeat-btn"),currentSongArt=document.querySelector(".track-art");let repeat=!1,repeatTo=0,repeatFrom=0,Album={},secondsToMMSS=e=>new Date(1e3*e).toISOString().slice(11,19);progressBar.addEventListener("mouseup",(e=>{let t=e.target.getBoundingClientRect(),r=e.clientX-t.left,a=t.width,o=Math.round(r/a*100)/100;PlayerState.Timestamp=Math.max(Math.min(TrackData.Duration*o,TrackData.Duration),0),ytPlayer.seekTo(PlayerState.Timestamp),disableRepeat(),updateProgress()}));let seek=e=>{PlayerState.Timestamp=e,ytPlayer.seekTo(e),disableRepeat(),updateProgress()},lastTime=0,updateProgress=()=>{Math.abs(ytPlayer.getCurrentTime()-lastTime)>4&&updateRepeat(),lastTime=ytPlayer.getCurrentTime(),currentProgress.style.setProperty("width",PlayerState.Timestamp/TrackData.Duration*100+"%"),currentTime.innerText=secondsToMMSS(PlayerState.Timestamp),songLength.innerText=secondsToMMSS(TrackData.Duration),currentTrackName.innerText=Album.Tracks.filter((e=>e.Timestamp<=PlayerState.Timestamp)).reverse()[0].Metadata.Title,currentArtistName.innerText=Album.Tracks.filter((e=>e.Timestamp<=PlayerState.Timestamp)).reverse()[0].Metadata.Artist,repeat&&PlayerState.Timestamp>=repeatFrom&&(PlayerState.Timestamp=repeatTo,ytPlayer.seekTo(PlayerState.Timestamp),updateProgress())},updateRepeat=()=>{repeatTo=Album.Tracks.filter((e=>e.Timestamp<=PlayerState.Timestamp)).reverse()[0].Timestamp,repeatFrom=Album.Tracks.filter((e=>e.Timestamp>=PlayerState.Timestamp))[0].Timestamp},disableRepeat=()=>{repeat=!1,repeatTrackButton.style.setProperty("color","white")},enableRepeat=()=>{repeat=!0,repeatTrackButton.style.setProperty("color","#3c50fa"),updateRepeat()},toggleRepeat=()=>{repeat=!repeat,repeat?(repeatTrackButton.style.setProperty("color","#3c50fa"),updateRepeat()):repeatTrackButton.style.setProperty("color","white")};repeatTrackButton.addEventListener("mouseup",(()=>{toggleRepeat()})),playPauseButton.addEventListener("mouseup",(async()=>{1===await ytPlayer.getPlayerState()?ytPlayer.pauseVideo():ytPlayer.playVideo()}));let startControls=()=>{-1===updateControlsHandle&&(updateControlsHandle=setInterval(controlsTrick,100))},stopControls=()=>{-1!==updateControlsHandle&&(clearInterval(updateControlsHandle),updateControlsHandle=-1)},controlsTrick=async()=>{PlayerState.Timestamp=await ytPlayer.getCurrentTime(),updateProgress()},ytPlayer,startPlaying=async e=>{ytPlayer=youtube_player__WEBPACK_IMPORTED_MODULE_0___default()("player",{videoId:e,width:"100%",height:"100%"});let t=setInterval((()=>{let e=document.querySelector("#player[src]");console.log("Searching for Player..."),e&&(console.log("Player found!"),e.setAttribute("credentialless",""),e.setAttribute("anonymous",""),e.src+="",e.style.setProperty("visibility","visible"),clearInterval(t),ytPlayer.on("ready",(e=>{ytPlayer.setVolume(10),ytPlayer.playVideo()})),ytPlayer.on("stateChange",(async e=>{1===e.data?(TrackData.Duration=await ytPlayer.getDuration(),songLength.innerText=secondsToMMSS(TrackData.Duration),startControls(),playPauseButton.innerText="⏸"):2===e.data&&(stopControls(),playPauseButton.innerText="▶")})))}),10)},pageSelectors=document.querySelectorAll(".nav-links > a");pageSelectors.forEach((e=>e.addEventListener("mouseup",(()=>{pageSelectors.forEach((e=>e.classList.remove("nav-active-page"))),e.classList.add("nav-active-page")})))),window.saveAsFile=(e,t)=>{const r=atob(t),a=new Array(r.length);for(let e=0;e<r.length;e++)a[e]=r.charCodeAt(e);const o=new Uint8Array(a),n=new Blob([o],{type:"application/octet-stream"}),l=document.createElement("a");l.href=URL.createObjectURL(n),l.download=e,l.click(),URL.revokeObjectURL(l.href)};let buildMarker=e=>{let t=document.createElement("div");return t.classList.add("marker"),"large"===e&&t.classList.add("large-marker"),"medium"===e&&t.classList.add("medium-marker"),"small"===e&&t.classList.add("small-marker"),t},timeline=document.querySelector(".timeline"),cursor=document.querySelector(".cursor"),cursorTimestamp=document.querySelector(".timestamp"),numLargeMarkers=3,deltaLarge=100/(numLargeMarkers+1);for(let e=0;e<100-deltaLarge;e+=deltaLarge){let t=buildMarker("large");t.style.setProperty("left",`${e+deltaLarge}%`),timeline.appendChild(t)}let numMediumMarkers=2*numLargeMarkers+1,deltaMedium=100/(numMediumMarkers+1);for(let e=0;e<100-deltaMedium;e+=deltaMedium){let t=buildMarker("medium");t.style.setProperty("left",`${e+deltaMedium}%`),timeline.appendChild(t)}let numSmallMarkers=2*numMediumMarkers+1,deltaSmall=100/(numSmallMarkers+1);for(let e=0;e<100-deltaSmall;e+=deltaSmall){let t=buildMarker("small");t.style.setProperty("left",`${e+deltaSmall}%`),timeline.appendChild(t)}timeline.addEventListener("mousemove",(e=>{let t=e.clientX/timeline.getBoundingClientRect().width;cursor.style.setProperty("left",100*t+"%");let r=secondsToMMSS(Math.round(TrackData.Duration*t));cursorTimestamp.innerText=r}));let colors=["#FFE74C","#FF5964","#777DA7","#6BF178","#35A7FF"],buildChapters=e=>{let t=Album.Tracks,r=Album.DurationInSeconds;document.querySelectorAll(".chapter").forEach((e=>e.remove()));let a=0;t.forEach((t=>{let o=document.createElement("div");o.classList.add("chapter"),e&&o.classList.add("selectable"),console.log(`[START] ${t.Metadata.Title}: ${t.StartInSeconds} / ${r}`),console.log(`[DURAT] ${t.Metadata.Title}: ${t.StartInSeconds} / ${r}`);let n=t.StartInSeconds/r*100,l=t.DurationInSeconds/r*100;o.style.setProperty("left",`${n}%`),o.style.setProperty("width",`${l}%`),o.style.setProperty("background",colors[a++%colors.length]),o.innerText=t.Metadata.Title,o.setAttribute("track-uuid",t.UUID),timeline.appendChild(o)}))};timeline.addEventListener("mousedown",(e=>{let t,r;document.querySelectorAll(".chapter").forEach((a=>{let o=a.getBoundingClientRect();o.right=o.left+o.width,o.bottom=o.top+o.height,Math.abs(o.left-e.clientX)<15&&e.clientY>o.top&&e.clientY<o.bottom&&(r=a),Math.abs(o.right-e.clientX)<15&&e.clientY>o.top&&e.clientY<o.bottom&&(t=a)})),console.log("PREVIOUS: ",t),console.log("NEXT: ",r)}))})()})();