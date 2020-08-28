import { fetchStory } from "../services/api";
import { timeFormat } from "../utils/utils";

const template = ({ by, id, kids, parent, text, time, type }) => {
  return `<div class="comment-header small-text">
<span class="comment-by">${by}</span>
<span class="comment-time">${timeFormat(time)}</span>
</div>
<div class="comment-text">${text}</div>
`;
};

export const getComments = function(story, isReply = false) {
  const promises = [];
  if (!story.kids) {
    return;
  }
  story.kids.forEach((comment, index) => {
    const promise = new Promise(resolve => {
      fetchStory(comment, resolve, index);
    });
    promises.push(promise);
  });
  Promise.all(promises).then(resolves => {
    resolves.forEach(event => renderComment(event, isReply));
  });
};

function renderComment({ event }, isReply) {
  const comment = JSON.parse(
    event.currentTarget.response.replace(/<[^>]+>/g, "")
  );
  const commentElement = document.createElement("div");
  commentElement.setAttribute("class", "comment");
  commentElement.setAttribute("id", "comment-" + comment.id);
  commentElement.innerHTML = template(comment);
  let parentElement;
  if (isReply) {
    parentElement = document.getElementById("comment-" + comment.parent);
  } else {
    parentElement = document.getElementById("story-" + comment.parent);
  }
  parentElement.appendChild(commentElement);
  if (comment.kids) {
    comment.kids.forEach(kid => getComments(kid, true));
  }
}
