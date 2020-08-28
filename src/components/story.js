import { timeFormat } from "../utils/utils";
import { getComments } from "./comment";

const template = (
  { by, descendants, id, kids, score, time, title, type, url },
  index
) => {
  let urlObject = null;
  try {
    urlObject = new URL(url);
  } catch (e) {
    console.log("bad url");
  }
  return `<div class="title">
  <span class="rank">${index + 1}.</span>
  <a ${
    urlObject ? "href=" + urlObject.href : ""
  } target="_blank">${title}</a> ${
    urlObject
      ? `<a class="small-text small-link" target="_blank" href="https://${urlObject.hostname}">(${urlObject.hostname})</a>`
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
  </div>`;
};
export const createStory = function(story, index) {
  const storyElement = document.createElement("div");
  storyElement.setAttribute("class", "story-row");
  // TODO in real app use frameworks, avoid innerHTML
  storyElement.innerHTML = template(story, index);
  const comments = storyElement.getElementsByClassName("comments");
  if (comments.length) {
    comments[0].addEventListener("click", () => {
      getComments(story);
    });
  }
  return storyElement;
};
//
// customElements.define(
//   StoryWebComponent,
//   class Story extends HTMLElement {
//     constructor() {
//       super();
//     }
//     connectedCallback() {
//       // const by = this.getAttribute("by");
//       // const descendants = this.getAttribute("descendants");
//       // const id = this.getAttribute("id");
//       // const kids = this.getAttribute("kids");
//       // const score = this.getAttribute("score");
//       // const time = this.getAttribute("time");
//       // const title = this.getAttribute("title");
//       // const type = this.getAttribute("type");
//       // const url = this.getAttribute("url");
//       // let shadowRoot = this.attachShadow({ mode: "open" });
//       // // TODO Web security
//       // shadowRoot.innerHTML = `

//       //   `;
//     }
//   }
// );

// {
//     "by" : "dhouston",
//     "descendants" : 71,
//     "id" : 8863,
//     "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
//     "score" : 111,
//     "time" : 1175714200,
//     "title" : "My YC app: Dropbox - Throw away your USB drive",
//     "type" : "story",
//     "url" : "http://www.getdropbox.com/u/2/screencast.html"
// }
