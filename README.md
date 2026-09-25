# PlaceSubs

A subscription tracker that shows you what you're actually paying for each month and reminds you before renewals hit.

**Live:** [placesubs.com](https://placesubs.com)

<img width="1440" height="851" alt="placesubs" src="https://github.com/user-attachments/assets/5f60a998-2355-41da-af16-779f59397c3d" />


## Features

- Add, edit and track subscriptions, with a dashboard showing monthly spend
- Email reminders before a subscription renews
- Google sign-in and account management
- Pro upgrade with Stripe payments
- Responsive layout for mobile and desktop

## Tech stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, authentication), Next.js server routes
- **Payments:** Stripe
- **Email:** Resend
- **Hosting:** Vercel

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in your own Supabase, Stripe and Resend keys
npm run dev
```

Open http://localhost:3000.
