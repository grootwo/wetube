const recordBtn = document.getElementById("recordBtn");
const videoPreview = document.getElementById("preview");

let stream;
let recorder;

const handleRecordStart = () => {
  recordBtn.innerText = "Stop Record";
  recordBtn.removeEventListener("click", handleRecordStart);
  recordBtn.addEventListener("click", handleRecordEnd);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    const videoFile = URL.createObjectURL(e.data);
    preview.srcObject = null;
    preview.src = videoFile;
    preview.loop = true;
    preview.play();
  };
  recorder.start();
};

const handleRecordEnd = () => {
  recorder.stop();
  recordBtn.innerText = "Download Record";
  recordBtn.removeEventListener("click", handleRecordEnd);
  recordBtn.addEventListener("click", handleRecordDownload);
};

const handleRecordDownload = () => {};

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
