# Keycard

This is a [Next.js](https://nextjs.org) project.

## Getting Started

First install dependencies
```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Shared cart manual test
- Add an item from `keycard.tech` using the CTA; the cart drawer should show it and the same item should appear in the `get.keycard.tech` drawer.
- Add an item from `get.keycard.tech` and refresh `keycard.tech`; the cart drawer should mirror the same quantity and totals.
- In the browser devtools, confirm the cookie `kc_cart_id` is set for `.keycard.tech` and persists across both subdomains.
