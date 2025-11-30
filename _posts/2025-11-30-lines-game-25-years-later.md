---
layout: post
title: "Recreating Lines: 25 Years from Java Applet to Modern Web"
date: 2025-11-30 23:45:00 +0200
categories: tech
tags: [javascript, gamedev, nostalgia, ai, agentic-workflow, canvas]
comments: true
---

Twenty-five years ago, I wrote my first "real" program—a Java Applet version of the classic Lines game. It was the late '90s/early 2000s, and Java Applets were *the* way to add interactivity to web pages. I remember the thrill of seeing those colorful balls appear in a browser window, the satisfaction of implementing the line-matching logic, and the pride of having built something playable.

Fast forward to 2025, and I decided to recreate that game. But this time, with a twist: **I'm building it with AI assistance**.

### The Old World vs. The New

Back then, development was a different beast:
- **Java Applets** required users to have the Java plugin installed (and pray it worked across browsers)
- **Development tools** were basic—I probably used Notepad++ or an early version of Eclipse
- **Debugging** meant endless `System.out.println()` statements and recompiling
- **Deployment** involved signing JAR files and hoping security warnings wouldn't scare users away

Today's web is remarkably different:
- **Canvas API** gives us pixel-perfect graphics directly in the browser
- **Modern JavaScript** is fast, standardized, and needs no plugins
- **Instant feedback** with live-reload development servers
- **No security headaches**—just serve a static file

But the biggest difference? **How I'm building it**.

### Building with an AI Agent

This time around, I'm not coding alone. I'm working alongside **Google Antigravity**, an agentic AI that doesn't just autocomplete my code—it *plans*, *implements*, and *verifies* entire features.

Here's what we've built so far for the [Gamma Project](/projects/third-test-project.html):

1. **Grid rendering** - A clean 9×9 grid using HTML5 Canvas
2. **Ball placement** - Random spawning of colorful balls (red, green, blue, yellow, cyan, magenta, orange)
3. **Game initialization** - 3 balls appear on load, 3 more spawn after each action
4. **Game Over detection** - When the board fills up, a dark overlay appears
5. **Restart functionality** - A "Start new" button to reset and play again

The workflow is fascinating. I describe what I want, the agent creates an implementation plan, I review it, and then it executes—writing the code, testing it in a browser, debugging issues, and documenting the changes. What would have taken me hours (or days, given how rusty my game dev skills are) happens in minutes.

For example, when I asked to add a restart button, the agent:
- Identified that the Game Over overlay needed restructuring
- Added a styled button with proper event handling
- Implemented a `restart()` method to reset the game state
- Verified it worked by simulating a full game cycle

It even caught its own bug! When the overlay wasn't displaying correctly after adding the button, it noticed, diagnosed the missing CSS properties, and fixed them immediately.

### What's Next?

The core mechanics are in place, but we're not done yet. The real Lines game needs:
- **Ball selection** - Click a ball to select it
- **Movement** - Click an empty cell to move the selected ball
- **Pathfinding** - Ensure the ball can reach the destination
- **Line detection** - Check for 5+ balls in a row (horizontal, vertical, diagonal)
- **Scoring** - Award points and clear matched lines
- **Preview** - Show which balls will spawn next

These are the features that made Lines addictive back in the day. And just like before, implementing them will be a journey of logic puzzles and algorithms—except this time, I have an AI partner to help me think through the solutions.

### Reflections

There's something poetic about recreating a project from 25 years ago. The game is the same, but everything around it has changed. The tools are better. The platform is better. And the way we build software is fundamentally different.

But the joy of creation? That hasn't changed at all.

If you're curious, you can [play with the current version here](/projects/third-test-project.html). It's not finished, but it's already playable—and it's only going to get better.

Here's to the next 25 years of building things. 🎮
