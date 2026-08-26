---
name: auto-research
description: Kỹ năng tự động nghiên cứu có kiểm soát (Auto-Research): Xác định ranh giới tìm kiếm, tra cứu tài liệu/API trước khi viết mã, yêu cầu xác nhận trước khi thay đổi lớn.
---

# Auto-Research Skill

## Overview

When implementing tasks, Claude Code can encounter uncertainties â€” design choices, algorithm details, API usage, or best practices. This skill provides an explicit-consent research path, presents findings, and waits for user approval before writing code.

The skill supports web research and an optional ChatGPT consultation. It never sends
conversation context, files, browser state, or credentials to a third party without the
user's explicit approval of the exact, redacted text.

## When to Use This Skill

- User asks a question where multiple valid approaches exist
- Claude is uncertain about algorithm details or API usage
- Design/architecture choices need comparison
- The user explicitly asks to search the web or consult ChatGPT and approves the proposed query

## How It Works

**Step 1: Propose the research boundary** â€” State the source to use, the exact query or
redacted prompt, whether any local/workspace text would leave the machine, and the likely
cost. Wait for the user to approve that exact boundary.

**Step 2: Research** â€” After approval, use web search or a browser session the user has
explicitly selected and authorized. Use a pinned, user-configured browser automation
connector; do not install packages automatically, use `@latest`, or access browser cookies,
other tabs, saved passwords, or sessions.

**Step 3: Present** â€” Distill findings into concise options with sources, presented to the user.

**Step 4: Await Approval** â€” Do NOT write code until the user says "go ahead" or picks an option.

**Step 5: Implement** â€” Once approved, execute with confidence.

### Explicit ChatGPT Consultation

Do not treat `?`, `??`, or another shorthand as consent. First propose a minimal prompt,
for example: `è¯·è¯„ä¼°è¿™ä¸ªå·²è„±æ•çš„æ–¹æ¡ˆçš„æ­£ç¡®æ€§ã€å®Œæ•´æ€§å’Œå¯æ”¹è¿›ä¹‹å¤„ï¼š<text>`.
Explicitly identify every piece of text that would be sent. Only after the user confirms
the exact prompt may you open the selected ChatGPT session, submit that prompt, and present
the response. Do not include conversation history by default.

Redact secrets, personal data, proprietary code, customer data, and internal URLs before
proposing the prompt. If safe redaction is not possible, do not submit it.

### Browser Automation Boundary

If browser automation is necessary, the user must separately authorize the selected browser
profile and connector version. Restrict the session to the consultation tab. Do not inspect,
reuse, export, or rely on cookies from other tabs or profiles.

## Examples

### Example 1: Design Question with GPT
```
User: PyTorch ä¸­è‡ªå®šä¹‰ ADMM ä¼˜åŒ–å™¨æ€Žä¹ˆè®¾è®¡ï¼Ÿ
Claude: æˆ‘å¯ä»¥æœç´¢å…¬å¼€èµ„æ–™ï¼Œæˆ–å°†ä»¥ä¸‹å·²è„±æ•é—®é¢˜å‘ç»™ ChatGPTï¼š
        â€œå¦‚ä½•è®¾è®¡ PyTorch è‡ªå®šä¹‰ ADMM ä¼˜åŒ–å™¨ï¼Ÿè¯·æ¯”è¾ƒå¯è¡Œæ¨¡å¼ã€‚â€
        ä¸ä¼šå‘é€å·¥ä½œåŒºæ–‡ä»¶æˆ–å¯¹è¯åŽ†å²ã€‚æ˜¯å¦å…è®¸ï¼Ÿ
User: å…è®¸å‘é€è¿™æ®µæ–‡å­—
Claude: [Opens only the authorized consultation tab, submits the approved prompt]
Claude: GPT suggests approach A with these pros/cons. Proceed?
User: è¡Œ
Claude: [Implements code]
```

### Example 2: Web Search
```
User: ?? ADMM convergence criteria best practices
Claude: I can search public sources for the exact redacted query
        â€œADMM convergence criteria best practicesâ€. No workspace files or conversation
        history will be sent. May I send that text to WebSearch and fetch the results?
User: Yes, send that query
Claude: [WebSearch + WebFetch â†’ finds Boyd et al. paper, extracts criteria]
Claude: Boyd recommends ||r|| < ÎµÂ·max(||Ax||, ||Bz||, ||c||). Use this?
User: Yes
Claude: [Implements]
```

## Best Practices
- âœ… Always present findings to user before writing code
- âœ… Use `page.fill()` for instant text injection instead of `keyboard.type()`
- âœ… Ask for fresh approval before every external consultation
- âœ… Include sources in findings
- âŒ Don't skip research and write code speculatively
- âŒ Don't send context, files, or browser data because of a shorthand trigger
- âŒ Don't alter the user's browser profile or session state

## Limitations
- Requires a user-configured, pinned browser automation connector if browser consultation is used
- ChatGPT consultation is optional; use ordinary web search when it meets the need
- GPT response time varies (10-30s typically)
- Web search quality depends on available sources
- Does not replace expert domain knowledge â€” always let user make the final call

## Security & Safety Notes
- Obtain explicit consent for each third-party submission, including the exact redacted text
- Never access, export, or depend on cookies, saved passwords, or unrelated browser tabs
- Never submit sensitive credentials, tokens, proprietary code, personal data, or internal URLs
- Do not install or execute browser tooling from an unpinned package version

## Common Pitfalls

| Problem | Solution |
|---------|----------|
| ChatGPT shows login page | Let the user log in themselves; do not handle cookies or credentials |
| The prompt contains sensitive context | Redact it or use local reasoning instead |
| Browser automation is unavailable | Use web search or stop and ask the user for a different approved method |

## Related Skills
- @systematic-debugging â€” use when debugging Playwright interactions with ChatGPT
- @condition-based-waiting â€” use when waiting for GPT responses in the browser

