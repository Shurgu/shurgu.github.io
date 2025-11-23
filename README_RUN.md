# How to Run This Project Locally

Follow these steps to set up your environment and run the project.

## 1. Install Prerequisites via Terminal

### Step 1: Install Homebrew
If you don't have Homebrew installed, run this command:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 2. Install Jekyll
The site is built with **Jekyll**, a static site generator written in Ruby.

### Option A: Using Homebrew (Recommended)
If you have Homebrew installed:
```bash
brew install jekyll
```

### Option B: Using RubyGems
If you have Ruby installed:
```bash
gem install jekyll bundler
```

## 3. Run the Project
1.  Navigate to the project folder:
    ```bash
    cd /path/to/shurgu.net
    ```
2.  Start the local server:
    ```bash
    jekyll serve
    ```
3.  Open your browser and go to:
    `http://localhost:4000`

That's it! The site uses standard CSS, so no build steps are required.
