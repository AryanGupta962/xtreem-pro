<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project context: XTREEM PRO website

## Purpose

This is the marketing website for **XTREEM PRO**, a 250 ml canned
**caffeinated beverage** sold in India. The site presents the product,
declared nutrition information, caffeine guidance, FSSAI-awareness content,
and distributor/contact information.

## Stack and conventions

- Next.js 16.2.9, React 19, TypeScript, Tailwind CSS v4.
- The App Router lives in `app/`; the page composition is in `app/page.tsx`.
- Shared UI lives in `app/components/`; many animated sections are client
  components using GSAP, Motion, Lenis, or canvas/WebGL.
- Public static assets belong in `public/` and are referenced from the root,
  for example `/images/xtreem-pro-can-v2.png`.
- Before changing Next.js code, read the relevant guide in
  `node_modules/next/dist/docs/` as required above. Preserve the existing
  App Router and client-component boundaries.

## Brand and compliance guardrails

- Describe the product as **"caffeinated beverage"**, not "energy drink" or
  "energy-drink", in user-facing copy, alt text, metadata, and comments added
  or changed during future work.
- Do not invent, alter, or make health/performance claims. Treat the approved
  packaging and supplied compliance copy as the source of truth.
- Keep caffeine warnings, nutrition values, serving size, FSSAI guidance, and
  disclaimer text intact unless the product owner supplies approved replacement
  wording.
- Avoid claims or visuals that imply the product is intended for children,
  pregnant/lactating people, or people sensitive to caffeine.

## Product asset source of truth

- Use `/images/xtreem-pro-can-v2.png` for every rendered product-can image.
  It is the current approved, clear transparent-background packshot.
- Preserve its transparency; use `object-contain` when rendering it and do not
  add a white background behind the asset.
- Do not use older `can.png` or `can.webp` for new work. If a new approved pack
  image arrives, add a new versioned asset rather than overwriting the current
  one, then update all consumers together.

## Important paths

- `app/layout.tsx` - global metadata, fonts, smooth scroll, custom cursor.
- `app/page.tsx` - landing-page section order.
- `app/components/FssaiGuidelines.tsx` - FSSAI-awareness content.
- `app/components/Nutrtion.tsx` - label-focused nutrition display.
- `app/components/Footer.tsx` - business contact details and caffeine warning.
- `public/images/` - static product and brand imagery.

## Quality checks

- Run `npm run lint` after TypeScript/React changes.
- Run `npm run build` for routing, metadata, or production-impacting changes
  when practical.
- Check mobile and desktop layouts after changing visual assets, especially
  hero, nutrition, and benefits sections.
- Preserve existing user changes; inspect `git status` before touching files.
