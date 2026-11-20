# The Eternal Promise — Luxury Engagement Invitation Website
### Faiq Ahmad & Ayesha Salman

A bespoke, cinematic, and interactive digital engagement invitation designed with the aesthetic restraint of an elite wedding atelier and the engineering craft of a modern frontend stack.

---

## 1. Project Overview

- **Groom:** Faiq Ahmad (`S/O Mr. and Mrs. Ishaq`)
- **Bride:** Ayesha Salman (`D/O Mr. and Mrs. Salman`)
- **Event:** Engagement Ceremony
- **Date:** 25 December 2026
- **Time:** 8:00 PM (PKT / UTC+05:00)
- **Venue:** Cottage, Daewoo Road (The Cottage Marquee, Daewoo Road, Faisalabad, Pakistan)
- **Timezone:** `Asia/Karachi`

---

## 2. Interactive Features & Journey

1. **The Opening Hero:** Full-screen deep emerald ground (`#172D27`) with gold Bismillah calligraphy (`بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`), regal couple typography (`Cormorant Garamond`), delicate botanical hairlines, and a gentle floating ambient music player.
2. **The Story:** Editorial daylight warmth (`#FAF8F3`) introducing both families, groom and bride cards with high-end atmospheric detail photography.
3. **The Blessing:** Authentic Quranic dua (`بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ`) in `Amiri` calligraphy with English translation on dark emerald backdrop.
4. **Interactive Date Reveal:** Tactile envelope sealed with a royal wax seal (`FA 2026`). Tapping the seal triggers golden confetti and smoothly unfolds the invitation card revealing `SAVE THE DATE · 25 DECEMBER 2026 · 8:00 PM`.
5. **Live Countdown:** Real-time counter calculating remaining Days, Hours, Minutes, and Seconds until `2026-12-25 20:00:00 PKT`. Automatically switches to a graceful celebration announcement upon event commencement.
6. **Ceremony Details:** High-end boutique typography registry showcasing event details with delicate dividers.
7. **Verified Venue Location:** Dedicated map section for **The Cottage Marquee, Daewoo Road, Faisalabad** with live embedded Google Map, GPS coordinates (`31.339722, 73.078028`), Copy Address button, and direct "Get Directions" navigation.
8. **Personal Message:** Warm parchment scroll letter to family and friends with cursive sign-off.
9. **Closing, Sharing & Replay:** Full invitation replay interaction that smoothly returns to top and resets the envelope, prefilled WhatsApp invitation share link, Web Share API / Copy Link action, and Add to Google Calendar button.

---

## 3. Central Event Configuration

All event information, venue coordinates, maps, dates, and copy are centralized in:
[`src/config/event.ts`](./src/config/event.ts)

```typescript
export const eventConfig = {
  groom: "Faiq Ahmad",
  groomParents: "S/O Mr. and Mrs. Ishaq",
  bride: "Ayesha Salman",
  brideParents: "D/O Mr. and Mrs. Salman",
  event: "Engagement Ceremony",
  date: "2026-12-25",
  time: "20:00",
  dateDisplay: "25 December",
  timeDisplay: "8:00 PM",
  yearDisplay: "2026",
  timezone: "Asia/Karachi",
  targetDateTime: "2026-12-25T20:00:00+05:00",
  venue: "Cottage, Daewoo Road",
  venueFullAddress: "The Cottage Marquee, Daewoo Road, Faisalabad, Pakistan",
  venueCoordinates: {
    lat: 31.339722,
    lng: 73.078028,
  },
  googleMapsUrl: "https://maps.google.com/?q=The+Cottage+Marquee+Daewoo+Road+Faisalabad",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=31.339722,73.078028",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=31.339722,73.078028&hl=en&z=15&output=embed",
  // ...
};
```

---

## 4. Local Installation & Development

### Prerequisites
- Node.js 18+ (Node 24 recommended)
- `pnpm` (or `npm` / `yarn`)

### Install Dependencies
```bash
pnpm install
```

### Start Development Server
```bash
pnpm dev
```
Open `http://localhost:5173/` in your browser.

---

## 5. Production Build

To test the optimized production build locally:

```bash
pnpm build
pnpm preview
```

The output bundle is compiled into `dist/`.

---

## 6. Vercel Deployment Instructions

### Option A: Via GitHub (Recommended)
1. Push this codebase to a private or public GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import the repository.
4. Framework Preset will auto-detect as **Vite**.
5. Build Command: `pnpm build` (or `npm run build`).
6. Output Directory: `dist`.
7. Click **Deploy**.

### Option B: Via Vercel CLI
```bash
npx vercel
```
Follow the interactive prompts to link and deploy to production:
```bash
npx vercel --prod
```
