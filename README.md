# genai-javascript

Repository created and initial README added by automation.

## Refactor notes

- `app.js` was refactored for clarity and robustness:
	- Load environment variables early with `dotenv`.
	- Validate `GROQ_API_KEY` at startup and exit with a clear message if missing.
	- Split tool handling into `handleToolCall` for safer parsing and error messages.
	- Improved logging and added `unhandledRejection` handler.
	- Removed commented legacy code and simplified flow.

## Quick start

1. Add your keys to a `.env` file in the project root:

```
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

2. Install dependencies and run (if not already installed):

```
npm install
node app.js
```

Notes: `node --check app.js` can be used to perform a syntax-only check without executing the script.
