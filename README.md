# Bharath Icons Puzzle Tribute

A responsive educational web app built with **Next.js + Tailwind CSS** that celebrates iconic Indian personalities through two mini-games:

1. **Image Sliding Puzzle**
2. **Bubble Blast Guess**

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Google Sheet configuration

1. Create a public Google Sheet with columns exactly in this order:

```text
Name | Image | DOB | Profession | Description | Awards
```

2. Make the sheet publicly viewable.
3. Create `.env.local` in project root and paste:

```bash
NEXT_PUBLIC_GOOGLE_SHEET_ID=PASTE_YOUR_SHEET_ID_OR_FULL_URL
NEXT_PUBLIC_GOOGLE_SHEET_NAME=Sheet1
```

> The app fetches data dynamically from the sheet using Google Visualization API.

## Project structure

- `app/` - pages and global styles
- `components/` - reusable UI/game components
- `services/googleSheetService.js` - fetch/parse Google Sheet data

## Accessibility and UX

- Keyboard-friendly controls (`Enter`, focus rings)
- Alt text and clear contrast
- Mobile-first responsive layouts
- Lightweight animations for flag wave, bubble pop, and celebration
