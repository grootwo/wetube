const video = document.querySelector("video");
const commentForm = document.getElementById("commentForm");
const commentList = document.querySelector(".video__comments__ul");

const canDeleteComments = document.querySelectorAll("#canDeleteComment");

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
  const commentId = comment.dataset.id; // 클릭한 댓글의 아이디 가져오기
  const reponse = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });
  if (reponse.status === 200) {
    // db에서 데이터 삭제가 정상적으로 완료되었다면
    comment.remove();
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

if (canDeleteComments) {
  // 이미 존재하는 댓글 중에 자신이 만든 댓글에만 삭제 버튼 보이기
  canDeleteComments.forEach((deleteIcon) => {
    deleteIcon.addEventListener("click", handleDeleteClick);
  });
}
