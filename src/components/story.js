import { timeFormat } from "../utils/utils";
import { getCommentsFromStory } from "./comment";

function template(
  { by, descendants, id, kids, score, time, title, type, url },
  index
) {
  let urlObject = null;
  try {
    urlObject = new URL(url);
  } catch (e) {
    console.log("bad url");
  }
  return `<div class="title">
<div style="display: flex;">
  <span class="rank">${index + 1}.</span>
  <a ${
    urlObject ? "href=" + urlObject.href : ""
  } target="_blank" class="story-link">${title}</a></div> 
${
  urlObject
    ? `<a class="small-link" target="_blank" href="https://${urlObject.hostname}">(${urlObject.hostname})</a>`
    : ""
}
  </div>
          <div class="container-substory small-text">
          <div class="score">${score} points</div>
          <div class="by"> by ${by}</div>
          <div class="since">${timeFormat(time)}</div>
          ${
            descendants > 0
              ? `| <a class="small-link comments">${descendants} comments</a>`
              : ""
          }
  </div>
<div class="comment-list"></div>`;
}

export function processStory({ event, index }) {
  //i've added a bit safety, in case of XSS attack
  const story = JSON.parse(
    event.currentTarget.response.replace(/<[^>]+>/g, "")
  );
  const table = document.querySelector("#items-list");
  table.appendChild(renderStory(story, index));
}

export function renderStory(story, index) {
  const storyElement = document.createElement("div");
  storyElement.setAttribute("id", "item-" + story.id);
  storyElement.setAttribute("class", "story-row");
  // TODO in real app avoid innerHTML - might have xss attacks
  storyElement.innerHTML = template(story, index);
  const comments = storyElement.getElementsByClassName("comments");
  if (comments.length) {
    const getCommentFromAPI = () => {
      comments[0].removeEventListener("click", getCommentFromAPI);
      getCommentsFromStory(story);
    };
    comments[0].addEventListener("click", getCommentFromAPI);
  }
  return storyElement;
}
