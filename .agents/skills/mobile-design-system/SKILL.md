---
name: mobile-design-system
description: Hệ thống thiết kế Mobile-First & Touch-First: Bảng đánh giá rủi ro MFRI, quy chuẩn ngón tay cái (Thumb-zone), touch targets >= 44px và tối ưu pin/CPU thiết bị y tế.
---

# Mobile Design System

**(Mobile-First Â· Touch-First Â· Platform-Respectful)**

> **Philosophy:** Touch-first. Battery-conscious. Platform-respectful. Offline-capable.
> **Core Law:** Mobile is NOT a small desktop.
> **Operating Rule:** Think constraints first, aesthetics second.

This skill exists to **prevent desktop-thinking, AI-defaults, and unsafe assumptions** when designing or building mobile applications.

---

## 1. Mobile Feasibility & Risk Index (MFRI)

Before designing or implementing **any mobile feature or screen**, assess feasibility.

### MFRI Dimensions (1â€“5)

| Dimension                  | Question                                                          |
| -------------------------- | ----------------------------------------------------------------- |
| **Platform Clarity**       | Is the target platform (iOS / Android / both) explicitly defined? |
| **Interaction Complexity** | How complex are gestures, flows, or navigation?                   |
| **Performance Risk**       | Does this involve lists, animations, heavy state, or media?       |
| **Offline Dependence**     | Does the feature break or degrade without network?                |
| **Accessibility Risk**     | Does this impact motor, visual, or cognitive accessibility?       |

### Score Formula

```
MFRI = (Platform Clarity + Accessibility Readiness)
       âˆ’ (Interaction Complexity + Performance Risk + Offline Dependence)
```

**Range:** `-10 â†’ +10`

### Interpretation

| MFRI     | Meaning   | Required Action                       |
| -------- | --------- | ------------------------------------- |
| **6â€“10** | Safe      | Proceed normally                      |
| **3â€“5**  | Moderate  | Add performance + UX validation       |
| **0â€“2**  | Risky     | Simplify interactions or architecture |
| **< 0**  | Dangerous | Redesign before implementation        |

---

## 2. Mandatory Thinking Before Any Work

### â›” STOP: Ask Before Assuming (Required)

If **any of the following are not explicitly stated**, you MUST ask before proceeding:

| Aspect     | Question                                   | Why                                      |
| ---------- | ------------------------------------------ | ---------------------------------------- |
| Platform   | iOS, Android, or both?                     | Affects navigation, gestures, typography |
| Framework  | React Native, Flutter, or native?          | Determines performance and patterns      |
| Navigation | Tabs, stack, drawer?                       | Core UX architecture                     |
| Offline    | Must it work offline?                      | Data & sync strategy                     |
| Devices    | Phone only or tablet too?                  | Layout & density rules                   |
| Audience   | Consumer, enterprise, accessibility needs? | Touch & readability                      |

ðŸš« **Never default to your favorite stack or pattern.**

---

## 3. Mandatory Reference Reading (Enforced)

### Universal (Always Read First)

| File                          | Purpose                            | Status            |
| ----------------------------- | ---------------------------------- | ----------------- |
| **mobile-design-thinking.md** | Anti-memorization, context-forcing | ðŸ”´ REQUIRED FIRST |
| **touch-psychology.md**       | Fittsâ€™ Law, thumb zones, gestures  | ðŸ”´ REQUIRED       |
| **mobile-performance.md**     | 60fps, memory, battery             | ðŸ”´ REQUIRED       |
| **mobile-backend.md**         | Offline sync, push, APIs           | ðŸ”´ REQUIRED       |
| **mobile-testing.md**         | Device & E2E testing               | ðŸ”´ REQUIRED       |
| **mobile-debugging.md**       | Native vs JS debugging             | ðŸ”´ REQUIRED       |

### Platform-Specific (Conditional)

| Platform       | File                |
| -------------- | ------------------- |
| iOS            | platform-ios.md     |
| Android        | platform-android.md |
| Cross-platform | BOTH above          |

> âŒ If you havenâ€™t read the platform file, you are not allowed to design UI.

---

## 4. AI Mobile Anti-Patterns (Hard Bans)

### ðŸš« Performance Sins (Non-Negotiable)

| âŒ Never                   | Why                  | âœ… Always                                |
| ------------------------- | -------------------- | --------------------------------------- |
| ScrollView for long lists | Memory explosion     | FlatList / FlashList / ListView.builder |
| Inline renderItem         | Re-renders all rows  | useCallback + memo                      |
| Index as key              | Reorder bugs         | Stable ID                               |
| JS-thread animations      | Jank                 | Native driver / GPU                     |
| console.log in prod       | JS thread block      | Strip logs                              |
| No memoization            | Battery + perf drain | React.memo / const widgets              |

---

### ðŸš« Touch & UX Sins

| âŒ Never               | Why                  | âœ… Always          |
| --------------------- | -------------------- | ----------------- |
| Touch <44â€“48px        | Miss taps            | Min touch target  |
| Gesture-only action   | Excludes users       | Button fallback   |
| No loading state      | Feels broken         | Explicit feedback |
| No error recovery     | Dead end             | Retry + message   |
| Ignore platform norms | Muscle memory broken | iOS â‰  Android     |

---

### ðŸš« Security Sins

| âŒ Never                | Why                | âœ… Always               |
| ---------------------- | ------------------ | ---------------------- |
| Tokens in AsyncStorage | Easily stolen      | SecureStore / Keychain |
| Hardcoded secrets      | Reverse engineered | Env + secure storage   |
| No SSL pinning         | MITM risk          | Cert pinning           |
| Log sensitive data     | PII leakage        | Never log secrets      |

---

## 5. Platform Unification vs Divergence Matrix

```
UNIFY                          DIVERGE
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€     â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Business logic                Navigation behavior
Data models                    Gestures
API contracts                  Icons
Validation                     Typography
Error semantics                Pickers / dialogs
```

### Platform Defaults

| Element   | iOS          | Android        |
| --------- | ------------ | -------------- |
| Font      | SF Pro       | Roboto         |
| Min touch | 44pt         | 48dp           |
| Back      | Edge swipe   | System back    |
| Sheets    | Bottom sheet | Dialog / sheet |
| Icons     | SF Symbols   | Material Icons |

---

## 6. Mobile UX Psychology (Non-Optional)

### Fittsâ€™ Law (Touch Reality)

* Finger â‰  cursor
* Accuracy is low
* Reach matters more than precision

**Rules:**

* Primary CTAs live in **thumb zone**
* Destructive actions pushed away
* No hover assumptions

---

## 7. Performance Doctrine

### React Native (Required Pattern)

```ts
const Row = React.memo(({ item }) => (
  <View><Text>{item.title}</Text></View>
));

const renderItem = useCallback(
  ({ item }) => <Row item={item} />,
  []
);

<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(i) => i.id}
  getItemLayout={(_, i) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * i,
    index: i,
  })}
/>
```

### Flutter (Required Pattern)

```dart
class Item extends StatelessWidget {
  const Item({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text('Static');
  }
}
```

* `const` everywhere possible
* Targeted rebuilds only

---

## 8. Mandatory Mobile Checkpoint

Before writing **any code**, you must complete this:

```
ðŸ§  MOBILE CHECKPOINT

Platform:     ___________
Framework:    ___________
Files Read:   ___________

3 Principles I Will Apply:
1.
2.
3.

Anti-Patterns I Will Avoid:
1.
2.
```

âŒ Cannot complete â†’ go back and read.

---

## 9. Framework Decision Tree (Canonical)

```
Need OTA + web team â†’ React Native + Expo
High-perf UI â†’ Flutter
iOS only â†’ SwiftUI
Android only â†’ Compose
```

No debate without justification.

---

## 10. Release Readiness Checklist

### Before Shipping

* [ ] Touch targets â‰¥ 44â€“48px
* [ ] Offline handled
* [ ] Secure storage used
* [ ] Lists optimized
* [ ] Logs stripped
* [ ] Tested on low-end devices
* [ ] Accessibility labels present
* [ ] MFRI â‰¥ 3

---

## 11. Related Skills

* **frontend-design** â€“ Visual systems & components
* **frontend-dev-guidelines** â€“ RN/TS architecture
* **backend-dev-guidelines** â€“ Mobile-safe APIs
* **error-tracking** â€“ Crash & performance telemetry

---

> **Final Law:**
> Mobile users are distracted, interrupted, and impatientâ€”often using one hand on a bad network with low battery.
> **Design for that reality, or your app will fail quietly.**

---

## When to Use
This skill is applicable to execute the workflow or actions described in the overview.

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.

