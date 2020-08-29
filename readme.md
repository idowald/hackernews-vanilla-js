# implementation of Hackernews

## what's inside:

A pure js implementation of hackernews with their API.
Using promise.all to resolve all the items.

# Notes

 - I didn't use web component, though it can be a better option for some cases.

 - I saved some time with CSS so I put everything in one file.
 


- In the original website there is site section, where you can see all comments from the same site.
for example: https://news.ycombinator.com/from?site=github.com. This wasn't implemented for the reasons of time scope.


# How to run?

Because I'm using vanilla js and a simple webpack
just open the file in your browser:
`/dist/index.html`

If you want to re-build run 
- `npm install`
- `npm start build`

To test

- `npm install`
- `npm test`

# Would be nice to add
Virtual scroll instead of more button.


User items / poll items

Splitting CSS to files and bundle them.

Webcomponent at least the comment section.


