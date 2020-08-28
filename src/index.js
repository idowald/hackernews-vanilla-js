// This is just a simple sample code to show you the usage of the api
// Feel free to rewrite and improve or delete and start from scratch

import { startSpinner, stopSpinner } from "./components/spinner";
import { fetchItem, fetchTopStores } from "./services/api";
import { processStory } from "./components/story";

let savedStoriesList = [];
function processList(event) {
  savedStoriesList = JSON.parse(event.currentTarget.response);
  fetchMoreStories();
}

let moreButton;
(function init() {
  fetchTopStores(processList);
  moreButton = document.getElementById("more-button");
  moreButton.addEventListener("click", fetchMoreStories);
})();

const tickSize = 15;
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
      fetchItem(savedStoriesList[firstIndex + i], resolve, firstIndex + i);
    });
    callbacks.push(promise);
  }
  // in real apps we need to handle errors of course
  Promise.all(callbacks).then(stories => {
    stories.forEach(processStory);
    stopSpinner();
  });
  firstIndex += tickSize;
  if (firstIndex >= savedStoriesList.length) {
    moreButton.disabled = true;
    moreButton.innerText = "no more top stories";
  }
}
