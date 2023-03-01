const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteIcon = muteBtn.querySelector("i");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const fullscreenIcon = fullscreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeValue = 0.5;
video.volume = volumeValue;
let timeoutLeaveId = null;
let timeoutMoveId = null;

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleVideoClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteIcon.classList = video.muted
    ? "fas fa-volume-up fa-lg"
    : "fas fa-volume-mute fa-lg";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeInput = (e) => {
  const changedValue = e.target.value;
  if (video.muted) {
    video.muted = false;
    muteIcon.classList = "fas fa-volume-mute fa-lg";
  }
  volumeValue = changedValue;
  video.volume = changedValue;
};

const handleVideoLoadedmetadata = () => {
  totalTime.innerText = formatTime(video.duration);
  timeline.max = Math.floor(video.duration);
};

const handletVideoTimeupdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineInput = (e) => {
  const changedTime = e.target.value;
  video.currentTime = Math.floor(changedTime);
};

const handleFullscreenClick = () => {
  const fullscreenElement = document.fullscreenElement;
  if (fullscreenElement) {
    document.exitFullscreen();
    fullscreenIcon.classList = "fas fa-expand fa-lg";
  } else {
    videoContainer.requestFullscreen();
    fullscreenIcon.classList = "fas fa-compress fa-lg";
  }
};

const hideControls = () => {
  videoControls.classList.remove("showing");
};

const handleMouseMove = () => {
  if (timeoutLeaveId) {
    clearTimeout(timeoutLeaveId);
    timeoutLeaveId = null;
  }
  if (timeoutMoveId) {
    clearTimeout(timeoutMoveId);
    timeoutMoveId = null;
  }
  videoControls.classList.add("showing");
  timeoutMoveId = setTimeout(hideControls, 1000);
};

const handleMouseLeave = () => {
  timeoutLeaveId = setTimeout(hideControls, 1000);
};

const handleVideoEnd = () => {
  const { videoId } = video.dataset.videoid;
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeInput);
video.addEventListener("timeupdate", handletVideoTimeupdate);
video.addEventListener("loadedmetadata", handleVideoLoadedmetadata);
timeline.addEventListener("input", handleTimelineInput);
fullscreenBtn.addEventListener("click", handleFullscreenClick);
video.addEventListener("mousemove", handleMouseMove);
videoControls.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handleVideoClick);
document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    handlePlayClick();
  }
});
video.addEventListener("ended", handleVideoEnd);
