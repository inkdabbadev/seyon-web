# Seyon Studio — Website

A multi-page portfolio website built with **Next.js 14 + TypeScript + Tailwind CSS**.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Services, Featured Work, Testimonials, CTA |
| `/work` | Portfolio — Filterable grid with lightbox viewer |
| `/about` | Studio story, values, and process |
| `/contact` | Project inquiry form |

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (scroll animations)
- **Lucide React** (icons)
- **Google Fonts** — Syne (display) + DM Sans (body)

---

## Getting Started

### 1. Install dependencies

```bash
cd inkdabba-website
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
npm start
```

---

## Connecting the Contact Form

The contact form currently simulates a submission. To make it live, use [Formspree](https://formspree.io):

1. Create a free account at formspree.io
2. Create a new form → copy your Form ID
3. In `src/app/contact/page.tsx`, replace the `setTimeout` block with:

```ts
const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ...form, services: selected }),
});
if (!res.ok) { setFormState("error"); return; }
```

---

## Customising Content

| What to change | Where |
|----------------|-------|
| Portfolio projects | `src/data/portfolio.ts` |
| Services list | `src/app/page.tsx` → `services` array |
| Testimonials | `src/app/page.tsx` → `testimonials` array |
| About story | `src/app/about/page.tsx` |
| Brand colors | `tailwind.config.ts` |
| Footer links | `src/components/Footer.tsx` |

---

## Adding New Portfolio Images

1. Drop the image into `public/portfolio/`
2. Add an entry to the `projects` array in `src/data/portfolio.ts`

---

## Deployment

Deploy instantly to [Vercel](https://vercel.com):

```bash
npx vercel
```

Or connect your GitHub repo to Vercel for automatic deploys on every push.
