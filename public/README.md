# Website Carbon Badges

Display your website's carbon emissions with a live updating badge. Powered by [Website Carbon](https://websitecarbon.com). Made with as few bytes as possible by [Wholegrain Digital](https://wholegraindigital.com)



## Installation
Adding the badge to your site is as simple as inserting the following lines into your markup where you would like the badge to appear:

```html
<div id="wcb" class="wcb"></div>
<script src="https://unpkg.com/website-carbon-badges@<1/b.min.js" defer></script>
```

![Badge - Light Version](./public/badge-light.png "Badge - Light Version")

If you need the badge to work on a dark background, add the `class="cbd"` (carbon badge dark) to the div container, like so:

```html
<div id="wcb" class="wcb wcb-d"></div>
<script src="https://unpkg.com/website-carbon-badges@<1/b.min.js" defer></script>
```

![Badge - Dark Version](./public/badge-dark.png "Badge - Dark Version")

## Development Info
To get started:
- `npm install`
- `gulp` or `gulp watch`

The build process compresses the `src/b.css` file and then inserts it into the javascript file before uglifying the js file. Both b.min.css and b.min.js are output into the root but only b.min.js is used by the badge.

## TODO
- Speed up server response
- Cache results in localStorage
- Further reduce loaded asset size if possible (please send us pull requests if you have ideas on how to do this)
