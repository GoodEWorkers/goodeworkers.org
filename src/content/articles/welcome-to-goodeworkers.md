---
title: "Welcome to GoodEworkers"
date: "2025-04-01"
description: "Why we started GoodEworkers and what we hope to achieve by helping nonprofits go remote."
author: "Alice Perchaud"
tags: ["intro", "mission"]
cover: "https://picsum.photos/seed/welcome/1600/900"
---

We started GoodEworkers because we believe that **everyone, everywhere, has something meaningful to contribute** — and that distance shouldn't be the thing that stops them.

> "The people who do the most good are rarely the ones with the most resources. They're the ones with the clearest sense of purpose."

## The idea

Nonprofits often want to do more, but they're stretched thin. Hiring locally is expensive, training takes time, and physical offices add overhead that doesn't directly serve the cause. Meanwhile, *talented professionals all over the world* are looking for projects that align with their values and don't require them to relocate.

We sit in the middle. We connect mission-driven volunteers with nonprofits that need their skills, and we help both sides work asynchronously, efficiently, and remotely.

### What we offer nonprofits

1. A vetted pool of volunteers across web, design, and content
2. Lightweight project frameworks that don't add overhead
3. A single point of contact through every project

### What volunteers get

- **Real impact** — projects that ship and matter
- **A community** of peers committed to the same kinds of causes
- **Flexibility** — async-first, set your own pace

## A note on tooling

We default to plain tools: shared docs, version-controlled markdown, and asynchronous chat. When code is involved we lean on small, sharp pieces — for example, our content collection schema fits in a few lines:

```ts
const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});
```

## What's next

Over the coming months we'll publish more about how we work, what we've learned from our first projects, and how nonprofits can get the most out of remote collaboration. If you'd like to be part of it — as a volunteer or as a nonprofit — [say hello](/#contact).
