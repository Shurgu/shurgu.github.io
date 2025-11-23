---
layout: post
title: "Simplifying the Stack: Seamless Node.js Removal"
description: "How we used an AI agent to migrate from LESS to CSS and eliminate build dependencies."
tags: [jekyll, agentic-workflow, minimalism]
---

In my previous post, I mentioned exploring **agentic workflows** with Google Antigravity. Today, we put that partnership to the test with a significant architectural change: **removing Node.js**.

### The Bloat
For years, this Jekyll site relied on **Grunt** (running on Node.js) to compile **LESS** files into CSS. While useful back in the day, it added unnecessary complexity. To run a simple static site, I needed `npm`, `node_modules`, and a `Gruntfile.js`.

### The Agentic Approach
I asked the agent to remove this dependency. Instead of just blindly deleting files, the agent:
1.  **Analyzed** the project structure and identified the LESS dependency.
2.  **Planned** a migration path: convert compiled CSS to a source file, then remove the build tools.
3.  **Executed** the plan:
    *   Beautified the minified CSS into a readable `main.css`.
    *   Removed `package.json`, `Gruntfile.js`, and the entire `node_modules` folder.
    *   Cleaned up legacy IE7 hacks from the CSS.

### The Result
The result is a pure, lightweight Jekyll site. No `npm install`, no build scripts—just Ruby and standard CSS. It was a seamless transition, executed perfectly by the AI agent, proving that complex refactoring tasks can be handled autonomously.
