# KAI UI/UX Agent

This repository contains Node.js scripts that use OpenAI to generate UI/UX design deliverables for the KAI e-learning platform.

## Setup

1. Install dependencies:

````bash
npm install
```

2. Obtain an OpenAI API key and set it in the environment variable `OPENAI_API_KEY`. You can create a `.env` file or export it in your shell.

3. Edit `input.txt` to describe your product brief.

## Usage

Run the improved agent script:

````bash
node kai-uiux-agent-final.js
```

The script will produce `KAI_UIUX_Agent_Output.md` containing the generated UX deliverables.
