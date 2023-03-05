const video = document.querySelector("video");
const commentForm = document.getElementById("commentForm");
const textarea = commentForm.querySelector("textarea");
const btn = commentForm.querySelectorAll("button");

const handleCommentSubmit = (event) => {
  event.preventDefault();
  const video = video.dataset.videoid;
  const text = textarea.value;
};

commentForm.addEventListener("submit", handleCommentSubmit);
