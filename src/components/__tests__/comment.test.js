import { renderComment } from "../comment";

test("check comment component", () => {
  const commentData =
    '{"by":"gorgoiler","id":24314409,"kids":[24315450,24314971,24314680],"parent":24314098,"text":"$1750 for that?!  Security researchers need to organize!<p>I have no idea what I’m talking about but my guess would be that the security economics of finding an RCE make it very valuable.  The disclosure would be worth considerably more to Slack than this bounty.  Something in the order of months’ worth of skilled labour, not hours.<p>I suppose the economics also mean Slack only have to outpay the bad guys, so this is really showing us poorly compensated black hat labor is?","time":1598686546,"type":"comment"}';
  const commentElement = renderComment(commentData);
  expect(commentElement.id).toEqual("item-24314409");
  expect(commentElement.children.length).toEqual(4);
  expect(commentElement.innerHTML).toContain(
    "$1750 for that?!  Security researchers need to organize!I have no idea"
  );
});
