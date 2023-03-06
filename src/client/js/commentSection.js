const video = document.querySelector("video");
const commentForm = document.getElementById("commentForm");

const handleCommentSubmit = (event) => {
  event.preventDefault();
  const textarea = commentForm.querySelector("textarea");
  const text = textarea.value;
  const videoId = video.dataset.videoid;
  if (text === "") {
    return;
  }
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
};

if (commentForm) {
  commentForm.addEventListener("submit", handleCommentSubmit);
}
