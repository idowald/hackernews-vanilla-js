import { renderStory } from "../story";

test("test story rendering", () => {
  const storyItem = {
    by: "arto",
    descendants: 12,
    id: 24303182,
    kids: [24316095, 24313707, 24315236, 24315863, 24315824, 24315167],
    score: 33,
    time: 1598608985,
    title: "WebAssembly Is Not a Stack Machine (2019)",
    type: "story",
    url: "http://troubles.md/wasm-is-not-a-stack-machine/"
  };
  const storyElement = renderStory(storyItem, 1);
  expect(storyElement.id).toEqual("item-24303182");
  expect(storyElement.children.length).toEqual(3);
  expect(storyElement.innerHTML).toContain('href="https://troubles.md"');
});
