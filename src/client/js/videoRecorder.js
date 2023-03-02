const recordBtn = document.getElementById("recordBtn");

const handleRecordClick = async () => {
  console.log("record");
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  console.log(stream);
};

recordBtn.addEventListener("click", handleRecordClick);
