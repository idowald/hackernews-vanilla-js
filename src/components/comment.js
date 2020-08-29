import { fetchItem } from "../services/api";
import { timeFormat } from "../utils/utils";
import { startSpinner, stopSpinner } from "./spinner";

function template({ by, kids, text, time }) {
  return `<div class="comment-header small-text">
<span class="comment-by">${by}</span>
<span class="comment-time">${timeFormat(time)}</span>
</div>
<div class="comment-text">${text}</div>
${kids ? `<a class="small-link comments">${kids.length} comments</a>` : ""}
<div class="comment-list"></div>
`;
}

function fetchComments(kids, parentId) {
  startSpinner();
  const promises = [];
  kids.forEach((comment, index) => {
    const promise = new Promise(resolve => {
      fetchItem(comment, resolve, index);
    });
    promises.push(promise);
  });
  const parentElement = document.getElementById("item-" + parentId);
  const commentListElement = parentElement.getElementsByClassName(
    "comment-list"
  )[0];
  Promise.all(promises).then(resolves => {
    resolves.forEach(({ event }) => {
      const commentElement = renderComment(event.currentTarget.response);
      commentListElement.appendChild(commentElement);
    });
    stopSpinner();
  });
}
export function getCommentsFromStory(story) {
  fetchComments(story.kids, story.id);
}

export function renderComment(commentData) {
  const comment = JSON.parse(commentData.replace(/<[^>]+>/g, ""));
  const commentElement = document.createElement("div");
  commentElement.setAttribute("class", "comment");
  commentElement.setAttribute("id", "item-" + comment.id);
  commentElement.innerHTML = template(comment);

  const commentsElement = commentElement.getElementsByClassName("comments");
  if (commentsElement.length) {
    const getCommentFromAPI = () => {
      commentsElement[0].removeEventListener("click", getCommentFromAPI);
      fetchComments(comment.kids, comment.id);
    };
    const listener = commentsElement[0].addEventListener(
      "click",
      getCommentFromAPI
    );
  }
  return commentElement;
}
