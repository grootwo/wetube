const video = document.querySelector("video");
const commentForm = document.getElementById("commentForm");

const handleCommentSubmit = (event) => {
  event.preventDefault();
  const textarea = commentForm.querySelector("textarea");
  const text = textarea.value;
  const videoId = video.dataset.videoid;
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    body: {
      text,
    },
  });
};

if (commentForm) {
  commentForm.addEventListener("submit", handleCommentSubmit);
}
