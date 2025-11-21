# How to Run This Project Locally

Follow these steps to set up your environment and run the project.

## 1. Install Prerequisites via Terminal

### Step 1: Install Homebrew
If you don't have Homebrew installed, run this command:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 2: Install Node.js
Use Homebrew to install Node.js (which includes `npm`):
```bash
brew install node
```

### Step 3: Install Jekyll
You can install Jekyll directly via Homebrew:
```bash
brew install jekyll
```

*Alternatively, if you prefer using RubyGems:*
```bash
gem install jekyll bundler
```

## 2. Install Project Dependencies

Navigate to the project directory and install dependencies:
```bash
npm install
```

## 3. Run the Project

Start the local development server:
```bash
jekyll serve
```
The site will be available at `http://localhost:4000`.

## Development Commands
- **Compile CSS**: `grunt less`
- **Watch for changes**: `grunt watch`
- **Run tests**: `grunt test`
