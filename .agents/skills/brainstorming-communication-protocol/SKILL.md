---
name: brainstorming-communication-protocol
description: Giao thức Socratic Gate & Giao tiếp: Tạm dừng trước các yêu cầu mơ hồ hoặc phức tạp, đặt 3 câu hỏi làm rõ trọng tâm trước khi bắt đầu thực thi code.
---

# Brainstorming & Communication Protocol

> **MANDATORY:** Use for complex/vague requests, new features, updates.

---

## ðŸ›‘ SOCRATIC GATE (ENFORCEMENT)

### When to Trigger

| Pattern | Action |
|---------|--------|
| "Build/Create/Make [thing]" without details | ðŸ›‘ ASK 3 questions |
| Complex feature or architecture | ðŸ›‘ Clarify before implementing |
| Update/change request | ðŸ›‘ Confirm scope |
| Vague requirements | ðŸ›‘ Ask purpose, users, constraints |

### ðŸš« MANDATORY: 3 Questions Before Implementation

1. **STOP** - Do NOT start coding
2. **ASK** - Minimum 3 questions:
   - ðŸŽ¯ Purpose: What problem are you solving?
   - ðŸ‘¥ Users: Who will use this?
   - ðŸ“¦ Scope: Must-have vs nice-to-have?
3. **WAIT** - Get response before proceeding

---

## ðŸ§  Dynamic Question Generation

**â›” NEVER use static templates.** Read `dynamic-questioning.md` for principles.

### Core Principles

| Principle | Meaning |
|-----------|---------|
| **Questions Reveal Consequences** | Each question connects to an architectural decision |
| **Context Before Content** | Understand greenfield/feature/refactor/debug context first |
| **Minimum Viable Questions** | Each question must eliminate implementation paths |
| **Generate Data, Not Assumptions** | Don't guessâ€”ask with trade-offs |

### Question Generation Process

```
1. Parse request â†’ Extract domain, features, scale indicators
2. Identify decision points â†’ Blocking vs. deferable
3. Generate questions â†’ Priority: P0 (blocking) > P1 (high-leverage) > P2 (nice-to-have)
4. Format with trade-offs â†’ What, Why, Options, Default
```

### Question Format (MANDATORY)

```markdown
### [PRIORITY] **[DECISION POINT]**

**Question:** [Clear question]

**Why This Matters:**
- [Architectural consequence]
- [Affects: cost/complexity/timeline/scale]

**Options:**
| Option | Pros | Cons | Best For |
|--------|------|------|----------|
| A | [+] | [-] | [Use case] |

**If Not Specified:** [Default + rationale]
```

**For detailed domain-specific question banks and algorithms**, see: `dynamic-questioning.md`

---

## Progress Reporting (PRINCIPLE-BASED)

**PRINCIPLE:** Transparency builds trust. Status must be visible and actionable.

### Status Board Format

| Agent | Status | Current Task | Progress |
|-------|--------|--------------|----------|
| [Agent Name] | âœ…ðŸ”„â³âŒâš ï¸ | [Task description] | [% or count] |

### Status Icons

| Icon | Meaning | Usage |
|------|---------|-------|
| âœ… | Completed | Task finished successfully |
| ðŸ”„ | Running | Currently executing |
| â³ | Waiting | Blocked, waiting for dependency |
| âŒ | Error | Failed, needs attention |
| âš ï¸ | Warning | Potential issue, not blocking |

---

## Error Handling (PRINCIPLE-BASED)

**PRINCIPLE:** Errors are opportunities for clear communication.

### Error Response Pattern

```
1. Acknowledge the error
2. Explain what happened (user-friendly)
3. Offer specific solutions with trade-offs
4. Ask user to choose or provide alternative
```

### Error Categories

| Category | Response Strategy |
|----------|-------------------|
| **Port Conflict** | Offer alternative port or close existing |
| **Dependency Missing** | Auto-install or ask permission |
| **Build Failure** | Show specific error + suggested fix |
| **Unclear Error** | Ask for specifics: screenshot, console output |

---

## Completion Message (PRINCIPLE-BASED)

**PRINCIPLE:** Celebrate success, guide next steps.

### Completion Structure

```
1. Success confirmation (celebrate briefly)
2. Summary of what was done (concrete)
3. How to verify/test (actionable)
4. Next steps suggestion (proactive)
```

---

## Communication Principles

| Principle | Implementation |
|-----------|----------------|
| **Concise** | No unnecessary details, get to point |
| **Visual** | Use emojis (âœ…ðŸ”„â³âŒ) for quick scanning |
| **Specific** | "~2 minutes" not "wait a bit" |
| **Alternatives** | Offer multiple paths when stuck |
| **Proactive** | Suggest next step after completion |

---

## Anti-Patterns (AVOID)

| Anti-Pattern | Why |
|--------------|-----|
| Jumping to solutions before understanding | Wastes time on wrong problem |
| Assuming requirements without asking | Creates wrong output |
| Over-engineering first version | Delays value delivery |
| Ignoring constraints | Creates unusable solutions |
| "I think" phrases | Uncertainty â†’ Ask instead |

---

