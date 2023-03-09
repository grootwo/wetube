const video = document.querySelector("video");
const commentForm = document.getElementById("commentForm");
const commentList = document.querySelector(".video__comments__ul");

const addComment = (text, id) => {
  const li = document.createElement("li");
  li.dataset.id = id;
  li.className = "video__comment";
  const textSpan = document.createElement("span");
  textSpan.innerText = text;
  const deleteSpan = document.createElement("span");
  deleteSpan.innerText = "X";
  li.appendChild(textSpan);
  li.appendChild(deleteSpan);
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
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (commentForm) {
  commentForm.addEventListener("submit", handleCommentSubmit);
}
