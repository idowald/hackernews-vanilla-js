// Note- as I understand, it was important not to use other libraries, so I continued to use XMLhttpRequest instead of newer stuff like "fetch"

export function fetchStory(storyId, callback, index) {
    var getStory = new XMLHttpRequest();
    getStory.addEventListener("load", event => callback({ event, index }));
    getStory.open(
        "GET",
        "https://hacker-news.firebaseio.com/v0/item/" + storyId + ".json"
    );
    getStory.send();
}

export function fetchTopStores(processList) {
    var getStoriesListRequest = new XMLHttpRequest();
    getStoriesListRequest.addEventListener("load", processList);
    getStoriesListRequest.open(
        "GET",
        "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    getStoriesListRequest.send();
}
