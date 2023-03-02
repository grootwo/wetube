const recordBtn = document.getElementById("recordBtn");
const videoPreview = document.getElementById("preview");

const handleRecordClick = async () => {
  console.log("record");
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 600, height: 450 },
  });
  console.log(stream);
  videoPreview.srcObject = stream;
  videoPreview.play();
};

recordBtn.addEventListener("click", handleRecordClick);
