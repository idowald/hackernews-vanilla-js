import { timeFormat, timeSince } from "../utils";

test("check time since format", () => {
  const now = new Date();
  expect(timeSince(now)).toContain("seconds");
  const minute_ago = now.getTime() - 1000 * 60 - 1000;
  expect(timeSince(minute_ago)).toEqual("1 minutes ago");
  const hour_ago = now.getTime() - 1000 * 60 * 60 - 1000;
  expect(timeSince(hour_ago)).toEqual("1 hours ago");
  const day_ago = now.getTime() - 1000 * 60 * 60 * 24 - 1000;
  expect(timeSince(day_ago)).toEqual("1 days ago");
  const year_ago = now.getTime() - 1000 * 60 * 60 * 24 * 366 - 1000;
  expect(timeSince(year_ago)).toEqual("1 years ago");
});

test("test date format unix", () => {
  const time = timeFormat(new Date().getTime() / 1000 - 1000);
  expect(time).toEqual("16 minutes ago");
});
