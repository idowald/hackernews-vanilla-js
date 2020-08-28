// This is just a simple sample code to show you the usage of the api
// Feel free to rewrite and improve or delete and start from scratch

import { createStory } from "./components/story";
import { startSpinner, stopSpinner } from "./components/spinner";
import { fetchStory, fetchTopStores } from "./services/api";

function processStory({ event, index }) {
  //i've added a bit safety, in case of XSS attack
  var story = JSON.parse(event.currentTarget.response.replace(/<[^>]+>/g, ''));
  var table = document.querySelector("#items-list");
  table.appendChild(createStory(story, index));
}

let savedStoriesList = [];
function processList(event) {
  savedStoriesList = JSON.parse(event.currentTarget.response);
  fetchMoreStories();
  // storiesList.forEach(renderStory);
}

let moreButton;
function init() {
  fetchTopStores(processList);
  moreButton = document.getElementById("more-button");
  moreButton.addEventListener("click", fetchMoreStories);
}
init();

const tickSize = 2;
let firstIndex = 0;
function fetchMoreStories() {
  startSpinner();
  const callbacks = [];
  for (
    let i = 0;
    i < tickSize && firstIndex + i < savedStoriesList.length;
    i++
  ) {
    const promise = new Promise(resolve => {
      fetchStory(savedStoriesList[firstIndex + i], resolve, firstIndex + i);
    });
    callbacks.push(promise);
  }
  // in real apps we need to handle errors of course
  Promise.all(callbacks).then(stories => {
    stories.forEach(processStory);
    stopSpinner();
  });
  firstIndex += tickSize;
  console.log(firstIndex + " " + savedStoriesList.length);
  if (firstIndex >= savedStoriesList.length) {
    moreButton.disabled = true;
    moreButton.innerText = "no more top stories";
  }
}
