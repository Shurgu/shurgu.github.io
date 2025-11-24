---
layout: post
title:  "Goodbye jQuery, Hello Vanilla JS (with a little help from AI)"
date:   2025-11-24 22:45:00
categories: tech
tags: [javascript, jquery, refactoring, ai, agentic-workflow]
comments: true
---

It's hard to believe, but I've finally removed jQuery from this site.

Ten years ago, jQuery was indispensable. It smoothed over the rough edges of browser inconsistencies (remember IE6?) and provided a sane API for DOM manipulation. `$('.selector').hide()` was magic compared to the verbose and buggy native equivalents of the time.

But the web has grown up.

Browsers have standardized. `document.querySelector` and `fetch` are now universally supported and just as easy to use. The need for a 90KB library just to select elements or make an AJAX request has vanished.

### The Agentic Refactor

The best part? I didn't have to hunt down every `$` myself. I used an **AI agent** to do the heavy lifting.

I simply asked the agent to analyze the codebase, find the jQuery dependencies, and propose a plan to remove them. It identified the usage in my project scripts, refactored the code to use vanilla JavaScript, and even cleaned up the project configuration files.

For example, it transformed this:

```javascript
window.ALPHA.init($('.draw-container'), $('.draw-container').width(), 350);
```

Into this:

```javascript
var container = document.querySelector('.draw-container');
window.ALPHA.init(container, container.offsetWidth, 350);
```

And `$.proxy`? Replaced with the native `.bind()`.

The result is a lighter, faster site with fewer dependencies, achieved in a fraction of the time it would have taken me to do it manually. It feels good to let go of the past and embrace the modern web platform—and the modern way of coding.

Farewell, jQuery. You served us well.
