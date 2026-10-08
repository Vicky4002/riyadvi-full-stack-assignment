# Riyadvi Software Technologies — Premium Full-Stack Website

A production-oriented corporate website built for the Riyadvi full-stack interview assignment. The project combines a premium interactive frontend, meaningful 3D, reusable content architecture, Express APIs and MongoDB-ready lead management.

## Assignment coverage

- Premium + futuristic + professional visual system using Riyadvi gold/black branding
- React/Vite frontend with reusable components and dynamic route templates
- Three.js / React Three Fiber 3D hero and interactive service visuals
- GSAP scroll-driven animation and Lenis smooth scrolling
- Dynamic service, portfolio, blog and careers route architecture
- Contact and consultation lead capture
- Six-step Business Health Checkup stored through the backend
- Software Project Planning Guide lead magnet with downloadable PDF
- Career application flow with resume capture (2MB data-URL demo limit)
- MongoDB/Mongoose persistence for leads and applications
- Validation, error handling, rate limiting and security headers
- Lightweight admin dashboard for enquiries and applications
- Responsive/mobile-aware visual system

## Stack

Frontend: React, Vite, React Router, Tailwind CSS, Three.js, React Three Fiber, Drei, GSAP, Lenis, Lucide
Backend: Node.js, Express.js, Mongoose, MongoDB Atlas, Helmet, CORS, express-rate-limit

## Run locally

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Set `MONGODB_URI` and `FRONTEND_URL` in `backend/.env`.

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server proxies `/api` to `http://localhost:5000`.

## MongoDB Atlas

Example:

```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/riyadvi?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
# ADMIN_KEY=use-a-long-random-secret
```

Never commit `.env` or expose the database password. URL-encode special characters in the password when placing it in the connection URI.

## API endpoints

```text
GET  /api/health
POST /api/contact
POST /api/consultation
POST /api/health-checkup
POST /api/lead-magnet
POST /api/applications
GET  /api/admin/summary
```

The API validates required fields, validates email addresses, returns consistent JSON responses, and protects the admin endpoint when `ADMIN_KEY` is configured.

## Main routes

```text
/
/services
/services/:id
/portfolio
/portfolio/:id
/about
/blog
/blog/:slug
/careers
/careers/:slug
/contact
/consultation
/business-health-checkup
/software-project-planning-guide
/admin
```

## Dynamic architecture

Service data → reusable service template → individual service routes.

Portfolio data → reusable case-study template → individual project routes.

Job data → reusable job template → individual career routes.

Blog data → reusable article template → individual article routes.

This avoids separate hardcoded page implementations for every item and leaves the content layer ready for a future CMS/API.

## Performance strategy

- Low-poly 3D geometry
- Device-pixel-ratio limits
- Suspense around 3D scenes
- Reduced visual workload on small screens
- Scroll animations isolated in reusable components
- Visual assets kept local and lightweight where possible
- No animation should block the primary content or conversion flow

For production, run a Lighthouse pass and add route-level lazy loading/code splitting before final submission.

## AI Tools Used

See `docs/AI-USAGE.md`. Major tools used in this project include ChatGPT and Bolt-style AI-assisted development workflows. Generated code was reviewed, debugged and manually integrated into the React/Express architecture rather than submitted unchanged.

## Git history

Use meaningful commits when moving the project into the final repository, for example:

```text
feat: implement interactive 3D hero
feat: create dynamic service templates
feat: create case study routes
feat: add lead capture APIs
feat: add business health checkup
feat: add lead magnet download flow
feat: add careers application flow
feat: add admin lead dashboard
perf: optimize 3D and mobile experience
fix: improve responsive navigation
```

## Production deployment

Recommended architecture:

```text
Vercel (frontend)
        ↓
Render / Railway (Express API)
        ↓
MongoDB Atlas
```

Production environment variables:

```text
MONGODB_URI
FRONTEND_URL
PORT
ADMIN_KEY (optional but recommended)
```

Before submission, verify every form against the production API, confirm the database writes successfully, run a mobile pass, run Lighthouse, and test every dynamic route.

## AI-assisted development documentation

The assignment requires documenting the AI workflow. See:

- `docs/AI-USAGE.md`
- `docs/TECHNICAL-WALKTHROUGH.md`

These explain tool purpose, prompt examples, generated areas, manual changes and the frontend → API → database architecture.
