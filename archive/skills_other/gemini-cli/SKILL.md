# Gemini CLI

Use Gemini in headless one-shot mode. Positional text starts interactive mode; use `-p/--prompt`.

Quick start

- `gemini -p "Answer this question..."`
- `gemini -m <model> -p "Prompt..."`
- `gemini -p "Return JSON" --output-format json`
- stdin appends to `-p`: `cat notes.md | gemini -p "Summarize"`

Extensions

- List: `gemini --list-extensions`
- Manage: `gemini extensions <command>`
- Skills: `gemini skills <command>`
- Hooks: `gemini hooks <command>`
- MCP: `gemini mcp <command>`

Notes

- If auth is required, run `gemini` once interactively and follow the login flow.
- Avoid `--yolo` for safety.
