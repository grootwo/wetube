import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const recordBtn = document.getElementById("recordBtn");
const videoPreview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const fileName = {
  input: "recording.webm",
  output: "output.mp4",
  thumbnail: "thumbnail.jpg",
};

const makeAAndDownload = (fileUrl, downloadName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = downloadName;
  document.body.appendChild(a);
  a.click();
};

const handleRecordStart = () => {
  recordBtn.innerText = "Recording";
  recordBtn.disabled = true;
  recordBtn.removeEventListener("click", handleRecordStart);
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data);
    videoPreview.srcObject = null;
    videoPreview.src = videoFile;
    videoPreview.loop = true;
    videoPreview.play();
    recordBtn.innerText = "Download Record";
    recordBtn.addEventListener("click", handleRecordDownload);
    recordBtn.disabled = false;
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 5000);
};

const handleRecordDownload = async () => {
  recordBtn.innerText = "Transcoding...";
  recordBtn.disabled = true;

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", fileName.input, await fetchFile(videoFile));
  await ffmpeg.run("-i", fileName.input, "-r", "60", fileName.output);
  await ffmpeg.run("-i", fileName.input, "-ss", "00:00:01", "thumbnail.jpg");
  const mp4File = ffmpeg.FS("readFile", fileName.output);
  const thumbfile = ffmpeg.FS("readFile", "thumbnail.jpg");
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbfile.buffer], { type: "image/jpg" });
  const mp4Url = URL.createObjectURL(mp4Blob);
  const jpgUrl = URL.createObjectURL(thumbBlob);

  makeAAndDownload(mp4Url, "recordingFile.mp4");
  makeAAndDownload(jpgUrl, "thumbnail.jpg");

  ffmpeg.FS("unlink", fileName.input);
  ffmpeg.FS("unlink", fileName.output);
  ffmpeg.FS("unlink", "thumbnail.jpg");

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(jpgUrl);
  URL.revokeObjectURL(videoFile);

  recordBtn.removeEventListener("click", handleRecordDownload);
  recordBtn.innerText = "Record again";
  recordBtn.addEventListener("click", handleRecordStart);
  recordBtn.disabled = false;
};

const setPreview = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 640, height: 360 },
  });
  console.log(stream);
  videoPreview.srcObject = stream;
  videoPreview.play();
};

recordBtn.addEventListener("click", handleRecordStart);

setPreview();
