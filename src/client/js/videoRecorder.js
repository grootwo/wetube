const recordBtn = document.getElementById("recordBtn");
const videoPreview = document.getElementById("preview");

let stream;

const handleRecordStart = () => {
  recordBtn.innerText = "Stop Record";
  recordBtn.removeEventListener("click", handleRecordStart);
  recordBtn.addEventListener("click", handleRecordEnd);
  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    console.log("recording done");
    console.log(e);
    console.log(e.data);
  };
  console.log("recording start");
  console.log(recorder);
  recorder.start();
  console.log(recorder);
  setTimeout(() => {
    recorder.stop();
  }, 10000);
};

const handleRecordEnd = () => {
  recordBtn.innerText = "Start Record";
  recordBtn.removeEventListener("click", handleRecordEnd);
  recordBtn.addEventListener("click", handleRecordStart);
};

const setPreview = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 600, height: 450 },
  });
  console.log(stream);
  videoPreview.srcObject = stream;
  videoPreview.play();
};

recordBtn.addEventListener("click", handleRecordStart);

setPreview();
