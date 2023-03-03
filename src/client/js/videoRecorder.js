import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const recordBtn = document.getElementById("recordBtn");
const videoPreview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleRecordStart = () => {
  recordBtn.innerText = "Stop Record";
  recordBtn.removeEventListener("click", handleRecordStart);
  recordBtn.addEventListener("click", handleRecordEnd);
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data);
    videoPreview.srcObject = null;
    videoPreview.src = videoFile;
    videoPreview.loop = true;
    videoPreview.play();
  };
  recorder.start();
};

const handleRecordEnd = () => {
  recorder.stop();
  recordBtn.innerText = "Download Record";
  recordBtn.removeEventListener("click", handleRecordEnd);
  recordBtn.addEventListener("click", handleRecordDownload);
};

const handleRecordDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const mp4Url = URL.createObjectURL(mp4Blob);
  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "recordingFile.mp4";
  document.body.appendChild(a);
  a.click();
};

const setPreview = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 600, height: 450 },
  });
  console.log(stream);
  videoPreview.srcObject = stream;
  videoPreview.play();
};

recordBtn.addEventListener("click", handleRecordStart);

setPreview();
