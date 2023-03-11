const video = document.querySelector("video");
const commentForm = document.getElementById("commentForm");
const commentList = document.querySelector(".video__comments__ul");

const addComment = (text, id) => {
  const li = document.createElement("li");
  li.className = "video__comment";
  li.dataset.id = id;
  const textSpan = document.createElement("span");
  textSpan.innerText = text;
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "far fa-times-circle";
  li.appendChild(textSpan);
  li.appendChild(deleteIcon);
  commentList.prepend(li);
  deleteIcon.addEventListener("click", handleDeleteClick);
};

const handleDeleteClick = async (e) => {
  const comment = e.target.parentElement;
  const commentId = comment.dataset.id;
  const reponse = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });
  if (reponse.status === 200) {
    comment.remove();
    console.log("remove done");
  }
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
