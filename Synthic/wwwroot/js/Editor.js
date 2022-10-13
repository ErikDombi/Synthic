/*! For license information please see Editor.js.LICENSE.txt */
(()=>{var __webpack_modules__={627:(module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.a(module,(async(__webpack_handle_async_dependencies__,__webpack_async_result__)=>{try{var youtube_player__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(62),youtube_player__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(youtube_player__WEBPACK_IMPORTED_MODULE_0__);let TrackData={Title:"",Author:"",Duration:204};window.TrackData=TrackData;let PlayerState={Track:TrackData,Timestamp:0};window.Eval=code=>(console.log("Evaling: "+code),eval(code));let updateControlsHandle=-1;const progressBar=document.querySelector(".music-progress-bar"),currentProgress=document.querySelector(".current-progress"),currentTime=document.querySelector(".current-time"),songLength=document.querySelector(".song-length"),playPauseButton=document.querySelector(".playPauseButton"),currentTrackName=document.querySelector(".track-title"),currentArtistName=document.querySelector(".track-artist"),repeatTrackButton=document.querySelector(".repeat-btn"),currentSongArt=document.querySelector(".track-art");let repeat=!1,repeatTo=0,repeatFrom=0,Album={},secondsToMMSS=e=>new Date(1e3*e).toISOString().slice(11,19);progressBar.addEventListener("mouseup",(e=>{let t=e.target.getBoundingClientRect(),r=e.clientX-t.left,a=t.width,o=Math.round(r/a*100)/100;PlayerState.Timestamp=Math.max(Math.min(TrackData.Duration*o,TrackData.Duration),0),player.seekTo(PlayerState.Timestamp),disableRepeat(),updateProgress()}));let seek=e=>{PlayerState.Timestamp=e,player.seekTo(e),disableRepeat(),updateProgress()},lastTime=0,updateProgress=()=>{Math.abs(player.getCurrentTime()-lastTime)>4&&updateRepeat(),lastTime=player.getCurrentTime(),currentProgress.style.setProperty("width",PlayerState.Timestamp/TrackData.Duration*100+"%"),currentTime.innerText=secondsToMMSS(PlayerState.Timestamp),songLength.innerText=secondsToMMSS(TrackData.Duration),currentTrackName.innerText=Album.Tracks.filter((e=>e.Timestamp<=PlayerState.Timestamp)).reverse()[0].Name,currentArtistName.innerText=Album.Tracks.filter((e=>e.Timestamp<=PlayerState.Timestamp)).reverse()[0].Artist,repeat&&PlayerState.Timestamp>=repeatFrom&&(PlayerState.Timestamp=repeatTo,player.seekTo(PlayerState.Timestamp),updateProgress())},updateRepeat=()=>{repeatTo=Album.Tracks.filter((e=>e.Timestamp<=PlayerState.Timestamp)).reverse()[0].Timestamp,repeatFrom=Album.Tracks.filter((e=>e.Timestamp>=PlayerState.Timestamp))[0].Timestamp},disableRepeat=()=>{repeat=!1,repeatTrackButton.style.setProperty("color","white")},enableRepeat=()=>{repeat=!0,repeatTrackButton.style.setProperty("color","#3c50fa"),updateRepeat()},toggleRepeat=()=>{repeat=!repeat,repeat?(repeatTrackButton.style.setProperty("color","#3c50fa"),updateRepeat()):repeatTrackButton.style.setProperty("color","white")};repeatTrackButton.addEventListener("mouseup",(()=>{toggleRepeat()})),playPauseButton.addEventListener("mouseup",(async()=>{1===await player.getPlayerState()?player.pauseVideo():player.playVideo()}));let startControls=()=>{-1===updateControlsHandle&&(updateControlsHandle=setInterval(controlsTrick,100))},stopControls=()=>{-1!==updateControlsHandle&&(clearInterval(updateControlsHandle),updateControlsHandle=-1)},controlsTrick=async()=>{PlayerState.Timestamp=await player.getCurrentTime(),updateProgress()},player=youtube_player__WEBPACK_IMPORTED_MODULE_0___default()("player");player.loadVideoById("88NmmgMBnH4"),await player.playVideo(),player.on("stateChange",(async e=>{1===e.data?(TrackData.Duration=await player.getDuration(),songLength.innerText=secondsToMMSS(TrackData.Duration),startControls(),playPauseButton.innerText="⏸"):2===e.data&&(stopControls(),playPauseButton.innerText="▶")}));let pageSelectors=document.querySelectorAll(".nav-links > a");pageSelectors.forEach((e=>e.addEventListener("mouseup",(()=>{pageSelectors.forEach((e=>e.classList.remove("nav-active-page"))),e.classList.add("nav-active-page")})))),__webpack_async_result__()}catch(e){__webpack_async_result__(e)}}),1)},90:e=>{function t(e,t){e.onload=function(){this.onerror=this.onload=null,t(null,e)},e.onerror=function(){this.onerror=this.onload=null,t(new Error("Failed to load "+this.src),e)}}function r(e,t){e.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,t(null,e))}}e.exports=function(e,a,o){var n=document.head||document.getElementsByTagName("head")[0],s=document.createElement("script");"function"==typeof a&&(o=a,a={}),a=a||{},o=o||function(){},s.type=a.type||"text/javascript",s.charset=a.charset||"utf8",s.async=!("async"in a)||!!a.async,s.src=e,a.attrs&&function(e,t){for(var r in t)e.setAttribute(r,t[r])}(s,a.attrs),a.text&&(s.text=""+a.text),("onload"in s?t:r)(s,o),s.onload||t(s,o),n.appendChild(s)}},988:e=>{"use strict";var t;t=function(){var e={},t={};return e.on=function(e,r){var a={name:e,handler:r};return t[e]=t[e]||[],t[e].unshift(a),a},e.off=function(e){var r=t[e.name].indexOf(e);-1!==r&&t[e.name].splice(r,1)},e.trigger=function(e,r){var a,o=t[e];if(o)for(a=o.length;a--;)o[a].handler(r)},e},e.exports=t},6:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=(a=r(275))&&a.__esModule?a:{default:a};t.default={pauseVideo:{acceptableStates:[o.default.ENDED,o.default.PAUSED],stateChangeRequired:!1},playVideo:{acceptableStates:[o.default.ENDED,o.default.PLAYING],stateChangeRequired:!1},seekTo:{acceptableStates:[o.default.ENDED,o.default.PLAYING,o.default.PAUSED],stateChangeRequired:!0,timeout:3e3}},e.exports=t.default},125:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=u(r(215)),o=u(r(255)),n=u(r(279)),s=u(r(6));function u(e){return e&&e.__esModule?e:{default:e}}var c=(0,a.default)("youtube-player"),i={proxyEvents:function(e){var t={},r=function(r){var a="on"+r.slice(0,1).toUpperCase()+r.slice(1);t[a]=function(t){c('event "%s"',a,t),e.trigger(r,t)}},a=!0,o=!1,s=void 0;try{for(var u,i=n.default[Symbol.iterator]();!(a=(u=i.next()).done);a=!0)r(u.value)}catch(e){o=!0,s=e}finally{try{!a&&i.return&&i.return()}finally{if(o)throw s}}return t},promisifyPlayer:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r={},a=function(a){t&&s.default[a]?r[a]=function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return e.then((function(e){var t=s.default[a],o=e.getPlayerState(),n=e[a].apply(e,r);return t.stateChangeRequired||Array.isArray(t.acceptableStates)&&-1===t.acceptableStates.indexOf(o)?new Promise((function(r){e.addEventListener("onStateChange",(function a(){var o=e.getPlayerState(),n=void 0;"number"==typeof t.timeout&&(n=setTimeout((function(){e.removeEventListener("onStateChange",a),r()}),t.timeout)),Array.isArray(t.acceptableStates)&&-1!==t.acceptableStates.indexOf(o)&&(e.removeEventListener("onStateChange",a),clearTimeout(n),r())}))})).then((function(){return n})):n}))}:r[a]=function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return e.then((function(e){return e[a].apply(e,r)}))}},n=!0,u=!1,c=void 0;try{for(var i,l=o.default[Symbol.iterator]();!(n=(i=l.next()).done);n=!0){var p=i.value;a(p)}}catch(e){u=!0,c=e}finally{try{!n&&l.return&&l.return()}finally{if(u)throw c}}return r}};t.default=i,e.exports=t.default},275:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={BUFFERING:3,ENDED:0,PAUSED:2,PLAYING:1,UNSTARTED:-1,VIDEO_CUED:5},e.exports=t.default},279:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["ready","stateChange","playbackQualityChange","playbackRateChange","error","apiChange","volumeChange"],e.exports=t.default},255:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["cueVideoById","loadVideoById","cueVideoByUrl","loadVideoByUrl","playVideo","pauseVideo","stopVideo","getVideoLoadedFraction","cuePlaylist","loadPlaylist","nextVideo","previousVideo","playVideoAt","setShuffle","setLoop","getPlaylist","getPlaylistIndex","setOption","mute","unMute","isMuted","setVolume","getVolume","seekTo","getPlayerState","getPlaybackRate","setPlaybackRate","getAvailablePlaybackRates","getPlaybackQuality","setPlaybackQuality","getAvailableQualityLevels","getCurrentTime","getDuration","removeEventListener","getVideoUrl","getVideoEmbedCode","getOptions","getOption","addEventListener","destroy","setSize","getIframe"],e.exports=t.default},62:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=u(r(988)),n=u(r(900)),s=u(r(125));function u(e){return e&&e.__esModule?e:{default:e}}var c=void 0;t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],u=(0,o.default)();if(c||(c=(0,n.default)(u)),t.events)throw new Error("Event handlers cannot be overwritten.");if("string"==typeof e&&!document.getElementById(e))throw new Error('Element "'+e+'" does not exist.');t.events=s.default.proxyEvents(u);var i=new Promise((function(r){"object"===(void 0===e?"undefined":a(e))&&e.playVideo instanceof Function?r(e):c.then((function(a){var o=new a.Player(e,t);return u.on("ready",(function(){r(o)})),null}))})),l=s.default.promisifyPlayer(i,r);return l.on=u.on,l.off=u.off,l},e.exports=t.default},900:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=(a=r(90))&&a.__esModule?a:{default:a};t.default=function(e){return new Promise((function(t){if(window.YT&&window.YT.Player&&window.YT.Player instanceof Function)t(window.YT);else{var r="http:"===window.location.protocol?"http:":"https:";(0,o.default)(r+"//www.youtube.com/iframe_api",(function(t){t&&e.trigger("error",t)}));var a=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=function(){a&&a(),t(window.YT)}}}))},e.exports=t.default},215:(e,t,r)=>{function a(){var e;try{e=t.storage.debug}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e}(t=e.exports=r(46)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},t.formatArgs=function(e){var r=this.useColors;if(e[0]=(r?"%c":"")+this.namespace+(r?" %c":" ")+e[0]+(r?"%c ":" ")+"+"+t.humanize(this.diff),r){var a="color: "+this.color;e.splice(1,0,a,"color: inherit");var o=0,n=0;e[0].replace(/%[a-zA-Z%]/g,(function(e){"%%"!==e&&(o++,"%c"===e&&(n=o))})),e.splice(n,0,a)}},t.save=function(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(e){}},t.load=a,t.useColors=function(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type)||("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},t.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},t.enable(a())},46:(e,t,r)=>{var a;function o(e){function r(){if(r.enabled){var e=r,o=+new Date,n=o-(a||o);e.diff=n,e.prev=a,e.curr=o,a=o;for(var s=new Array(arguments.length),u=0;u<s.length;u++)s[u]=arguments[u];s[0]=t.coerce(s[0]),"string"!=typeof s[0]&&s.unshift("%O");var c=0;s[0]=s[0].replace(/%([a-zA-Z%])/g,(function(r,a){if("%%"===r)return r;c++;var o=t.formatters[a];if("function"==typeof o){var n=s[c];r=o.call(e,n),s.splice(c,1),c--}return r})),t.formatArgs.call(e,s);var i=r.log||t.log||console.log.bind(console);i.apply(e,s)}}return r.namespace=e,r.enabled=t.enabled(e),r.useColors=t.useColors(),r.color=function(e){var r,a=0;for(r in e)a=(a<<5)-a+e.charCodeAt(r),a|=0;return t.colors[Math.abs(a)%t.colors.length]}(e),"function"==typeof t.init&&t.init(r),r}(t=e.exports=o.debug=o.default=o).coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){t.enable("")},t.enable=function(e){t.save(e),t.names=[],t.skips=[];for(var r=("string"==typeof e?e:"").split(/[\s,]+/),a=r.length,o=0;o<a;o++)r[o]&&("-"===(e=r[o].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){var r,a;for(r=0,a=t.skips.length;r<a;r++)if(t.skips[r].test(e))return!1;for(r=0,a=t.names.length;r<a;r++)if(t.names[r].test(e))return!0;return!1},t.humanize=r(680),t.names=[],t.skips=[],t.formatters={}},680:e=>{var t=1e3,r=60*t,a=60*r,o=24*a;function n(e,t,r){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+r:Math.ceil(e/t)+" "+r+"s"}e.exports=function(e,s){s=s||{};var u,c=typeof e;if("string"===c&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var n=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(n){var s=parseFloat(n[1]);switch((n[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*s;case"days":case"day":case"d":return s*o;case"hours":case"hour":case"hrs":case"hr":case"h":return s*a;case"minutes":case"minute":case"mins":case"min":case"m":return s*r;case"seconds":case"second":case"secs":case"sec":case"s":return s*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return s;default:return}}}}(e);if("number"===c&&!1===isNaN(e))return s.long?n(u=e,o,"day")||n(u,a,"hour")||n(u,r,"minute")||n(u,t,"second")||u+" ms":function(e){return e>=o?Math.round(e/o)+"d":e>=a?Math.round(e/a)+"h":e>=r?Math.round(e/r)+"m":e>=t?Math.round(e/t)+"s":e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}}},__webpack_module_cache__={},webpackQueues,webpackExports,webpackError,resolveQueue;function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](r,r.exports,__webpack_require__),r.exports}webpackQueues="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",webpackExports="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",webpackError="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",resolveQueue=e=>{e&&!e.d&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},__webpack_require__.a=(e,t,r)=>{var a;r&&((a=[]).d=1);var o,n,s,u=new Set,c=e.exports,i=new Promise(((e,t)=>{s=t,n=e}));i[webpackExports]=c,i[webpackQueues]=e=>(a&&e(a),u.forEach(e),i.catch((e=>{}))),e.exports=i,t((e=>{var t;o=(e=>e.map((e=>{if(null!==e&&"object"==typeof e){if(e[webpackQueues])return e;if(e.then){var t=[];t.d=0,e.then((e=>{r[webpackExports]=e,resolveQueue(t)}),(e=>{r[webpackError]=e,resolveQueue(t)}));var r={};return r[webpackQueues]=e=>e(t),r}}var a={};return a[webpackQueues]=e=>{},a[webpackExports]=e,a})))(e);var r=()=>o.map((e=>{if(e[webpackError])throw e[webpackError];return e[webpackExports]})),n=new Promise((e=>{(t=()=>e(r)).r=0;var n=e=>e!==a&&!u.has(e)&&(u.add(e),e&&!e.d&&(t.r++,e.push(t)));o.map((e=>e[webpackQueues](n)))}));return t.r?n:r()}),(e=>(e?s(i[webpackError]=e):n(c),resolveQueue(a)))),a&&(a.d=0)},__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var r in t)__webpack_require__.o(t,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var __webpack_exports__=__webpack_require__(627)})();