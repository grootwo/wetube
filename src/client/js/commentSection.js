const video = document.querySelector("video");
const commentForm = document.getElementById("commentForm");
const commentList = document.querySelector(".video__comments__ul");

const addComment = (text) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  commentList.prepend(li);
};

const handleCommentSubmit = async (event) => {
  event.preventDefault();
  const textarea = commentForm.querySelector("textarea");
  const text = textarea.value;
  const videoId = video.dataset.videoid;
  if (text === "") {
    return;
  }
  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (status === 201) {
    addComment(text);
  }
};

if (commentForm) {
  commentForm.addEventListener("submit", handleCommentSubmit);
}
