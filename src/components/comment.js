import { fetchStory } from "../services/api";

export const getComments = function(story) {
  const promises = [];
  if (!story.kids) {
    console.error("error no kids");
    return;
  }
  story.kids.forEach((comment, index) => {
    const promise = new Promise(resolve => {
      fetchStory(comment, resolve, index);
    });
    promises.push(promise);
  });
};
