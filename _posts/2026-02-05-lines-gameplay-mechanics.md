---
layout: post
title: "Lines Development: Breathing Life into the Grid"
date: 2026-02-05 17:00:00 +0200
categories: tech
tags: [javascript, gamedev, algorithms, ai, agentic-workflow]
comments: true
---

The static grid from my last update has come alive. 

When I last wrote about the [Gamma Project](/projects/third-test-project.html), we had a board and some random balls. It was a start, but it wasn't a game. Today, I'm happy to report that the core soul of "Lines"—the mechanics that keep you clicking for "just one more turn"—is fully implemented.

### The Mechanics of Flow

Turning a grid of colored circles into a playable game required solving three distinct logic puzzles: how to move, how to find matches, and how to reward the player.

#### 1. Finding the Way (BFS)
In Lines, balls don't just teleport. They travel. And they can't jump over other balls. To implement this, we used the **Breadth-First Search (BFS)** algorithm.


When you click a ball and then an empty square, the game calculates if a clear path of empty cells connects them. If the path is blocked by other colors, the move is forbidden. It adds that crucial layer of strategy: you're not just matching colors, you're managing space.

#### 2. The Satisfaction of the Line
The heart of the game is the *pop*. Aligning 5 balls of the same color should feel instantly rewarding.

We implemented a robust line detection algorithm that scans the board in four directions—Horizontal, Vertical, and both Diagonals—after every move. 

If it finds a sequence of 5 or more matching balls:
1.  **They vanish.** The board clears up, giving you breathing room.
2.  **You get a free turn.** No new balls spawn, allowing you to chain combos.

#### 3. The Scoreboard
We finally have a way to keep score! Sticking to the classic rules:
- **10 points** for a standard line of 5.
- **+2 points** for every extra ball in that line.

It differentiates a lucky save from a masterful 7-ball cross-clear.

### The Agentic Workflow: Coding with a Partner

What makes this project unique isn't just the code, but *how* it's being written. I'm working with **Google Antigravity**, an AI agent.

For the scoring system, our workflow looked like this:
1.  **Planning**: I asked for scoring. The agent researched standard "Lines 98" rules to ensure authenticity.
2.  **Implementation**: It drafted the code to track state and update the DOM.
3.  **Verification**: This is the magic part. The agent didn't just say "done." It spawned a browser instance, **played the game itself**, placed 5 balls, checked the score, placed 6 balls, checked the math, and *proved* it worked before handing it back to me.

It feels less like using a tool and more like pair programming with a tireless engineer who loves writing test cases.

### What's Next?
The game is playable! You can move, score, and lose (when the board fills up). 

Next, we need to polish the rough edges:
- **Preview bubbles**: Showing where the next colors will land.
- **Animations**: Making the movement and clearing feel smooth and impactful.

Play the latest build [here](/projects/third-test-project.html) and let me know your high score! 
