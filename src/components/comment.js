import { fetchItem } from "../services/api";
import { timeFormat } from "../utils/utils";

function template({ by, kids, text, time }) {
  return `<div class="comment-header small-text">
<span class="comment-by">${by}</span>
<span class="comment-time">${timeFormat(time)}</span>
</div>
<div class="comment-text">${text}</div>
${kids ? `<a class="small-link comments">${kids.length} comments</a>` : ""}
`;
}

function fetchComments(kids) {
  const promises = [];
  kids.forEach((comment, index) => {
    const promise = new Promise(resolve => {
      fetchItem(comment, resolve, index);
    });
    promises.push(promise);
  });
  Promise.all(promises).then(resolves => {
    resolves.forEach(event => renderComment(event));
  });
}
export function getComments(story) {
  fetchComments(story.kids);
}

function renderComment({ event }) {
  const comment = JSON.parse(
    event.currentTarget.response.replace(/<[^>]+>/g, "")
  );
  const commentElement = document.createElement("div");
  commentElement.setAttribute("class", "comment");
  commentElement.setAttribute("id", "item-" + comment.id);
  commentElement.innerHTML = template(comment);

  const commentsElement = commentElement.getElementsByClassName("comments");
  if (commentsElement.length) {
    const getCommentFromAPI = () => {
      commentsElement[0].removeEventListener("click", getCommentFromAPI);
      fetchComments(comment.kids);
    };
    const listener = commentsElement[0].addEventListener(
      "click",
      getCommentFromAPI
    );
  }
  const parentElement = document.getElementById("item-" + comment.parent);
  parentElement.appendChild(commentElement);
}
