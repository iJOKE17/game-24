# Game 24

A [Next.js](https://nextjs.org) web app for **Game 24**: use four numbers and the operators +, −, ×, ÷ to make an expression that equals 24.

**Play:** [Game 24](https://game-24-lyart.vercel.app/play)

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Lottie** (celebration animations)

## Project Structure

```
app/
  globals.css           # Global styles
  layout.tsx            # Root layout
  page.tsx              # Home (redirects to /play)
  component/            # Shared components
    CelebrationAnimation.tsx
    checkIcon.tsx
    clearIcon.tsx
    footer.tsx
    GameTimer.tsx
    navBar.tsx
    reload.tsx
    ResultModal.tsx
  play/
    layout.tsx
    page.tsx            # Main game page
  rules/
    page.tsx            # Game rules
  about/
    page.tsx            # About page
  contract/
    page.tsx            # Contract / terms
  login/
    page.tsx            # Login page
public/                 # Static assets (logo, Lottie JSON)
types/                  # TypeScript types and validators
  cache-life.d.ts
  routes.d.ts
  validator.ts
```

## Getting Started

Install dependencies:

```bash
pnpm install
# or
yarn install
# or
npm install
```

Run the development server:

```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/play`.

## Features

- **Play Game 24** — Four random numbers (1–9), fill slots with numbers and operators, check if the expression equals 24
- **Timer** — Tracks how long you take per round
- **Celebration** — Lottie animation on success
- **Rules** — In-app rules page
- **About & Contract** — Info and terms pages
- **Login** — Login page with **Google OAuth** ([setup guide](docs/GOOGLE_LOGIN_SETUP.md))
- **Responsive UI** — Reusable components, TypeScript, Tailwind

## Customization

- Shared UI: `app/component/`
- Game logic and types: `app/play/page.tsx`, `types/`

## Deployment

Deploy on [Vercel](https://vercel.com/) or any platform that supports Next.js.

## How to Contribute

1. **Fork** the repo and clone your fork locally.
2. **Install** dependencies (`pnpm install`).
3. **Create a branch** for your change: `git checkout -b feature/your-feature` or `fix/your-fix`.
4. **Make your changes** — keep commits focused and messages clear.
5. **Run the app** with `pnpm dev` and run `pnpm lint` before pushing.
6. **Push** to your fork and open a **Pull Request** against the main repo. Describe what you changed and why.

Improvements to the game logic, UI, docs, or new features are welcome.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
