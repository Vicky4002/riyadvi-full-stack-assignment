# Riyadvi — Digital Experience Rebuild

A responsive, multi-page corporate website concept for the Riyadvi Software Technologies full-stack interview assignment. The interface uses a black-and-gold visual system, lazy-loaded interactive WebGL scenes, scroll-triggered reveals, smooth scrolling, responsive/mobile rendering, reduced-motion support, and an Express/MongoDB API.

> **Important:** Case studies and job listings in this demo are illustrative sample content. They must not be represented as verified client work or confirmed live vacancies. Confirm factual company copy and contact details with Riyadvi before submission.

## Stack

- **Frontend:** React 18, Vite, React Router, Three.js, React Three Fiber, Drei, GSAP + ScrollTrigger, Lenis, Lucide icons.
- **Backend:** Node.js, Express, Mongoose, MongoDB Atlas, Helmet, CORS, express-rate-limit, Multer for resume uploads, Nodemailer for optional SMTP notifications.
- **3D and motion:** Three.js through React Three Fiber + Drei; GSAP ScrollTrigger for scroll reveals; Lenis smooth scrolling; CSS keyframe micro-motion and reduced-motion support. These are used in the experience rather than merely installed.

## Pages and routes

- `/` — home, 3D hero, services, transformation process, case studies, technology constellation, insights.
- `/services` and `/services/:slug` — six individual service pages.
- `/portfolio` and `/portfolio/:slug` — portfolio list and individual case studies.
- `/about` — company narrative, principles and interactive 3D.
- `/blog` and `/blog/:slug` — insight index and individual articles.
- `/careers` and `/careers/:slug` — job index and detail pages.
- `/contact`, `/consultation`, `/health-checkup` and `/business-health-checkup`, `/project-planning-guide` and `/software-project-planning-guide`, `/admin` — business conversion and protected admin paths.

## Run locally

Requirements: Node.js 20+ and npm.

### 1. Configure MongoDB

```bash
cd backend
copy .env.example .env  (Windows CMD; PowerShell: Copy-Item .env.example .env)
```

Edit `backend/.env` and set a valid `MONGODB_URI`. For MongoDB Atlas, use the application database user and the correct cluster host; URL-encode special characters in the password. Add your current IP in Atlas Network Access, or use a restricted deployment network rule appropriate for your environment. Never commit `.env` or share its credentials.

Set `CLIENT_ORIGIN=http://localhost:5173` for local development. To enable email notifications, set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` and `NOTIFY_EMAIL`. Notifications are optional; lead persistence does not depend on SMTP. Set a long random `ADMIN_API_KEY` to enable `/admin`.

### 2. Start the API

```bash
cd backend
npm install
npm run dev
```

Check `http://localhost:5000/api/health`. A healthy database should report `"database":"connected"`.

### 3. Start the frontend

In a second terminal:

```bash
cd frontend
copy .env.example .env  (Windows CMD; PowerShell: Copy-Item .env.example .env)
npm install
npm run dev
```

Open `http://localhost:5173`. If the API is hosted elsewhere, create `frontend/.env` with `VITE_API_URL=https://your-api-host/api` and restart Vite.

## API

- `GET /api/health` — service and database status.
- `GET /api/services`, `GET /api/services/:slug` — service content.
- `GET /api/cases`, `GET /api/cases/:slug` — case-study content.
- `GET /api/posts`, `GET /api/posts/:slug` — blog content.
- `GET /api/jobs`, `GET /api/jobs/:slug` — career content.
- `POST /api/leads` — validated general enquiries persisted to MongoDB.
- `POST /api/contact`, `/api/consultation`, `/api/health-checkup`, `/api/lead-magnet` — compatible typed lead endpoints.
- `POST /api/applications` — multipart resume upload (PDF/DOC/DOCX, max 5 MB) plus career application details.
- `GET /api/admin/summary`, `GET /api/admin/leads` — admin-key-protected counts and recent enquiries/applications.
- `GET /api/admin/applications/:id/resume` — admin-key-protected resume download.

The business health checkup is a six-step flow and stores its answers with the lead. The planning guide is downloadable after the lead-magnet form is accepted.

The lead endpoint includes basic validation, a honeypot field and rate limiting. Application uploads have a separate rate limit and file type/size checks. Production hardening should also include monitoring, backups, a privacy/retention policy, secure secret management and a review of resume retention before real customer data is processed.

## AI Tools Used

### ChatGPT
- **Purpose:** Interpret the supplied assignment, plan the route/content architecture, draft initial React and Express implementation, and help debug integration risks.
- **Example prompt:** “Rebuild the Riyadvi full-stack assignment as a premium multi-page React experience with meaningful 3D/animation, service/case-study/blog/career detail routes, MongoDB-backed lead forms, and a documented API.”
- **Generated:** Initial implementation scaffold, content model, reusable components, page structure, CSS design system, API routes and documentation.
- **Manual changes/review required:** Validate company facts and real portfolio/career content; configure Atlas credentials; run dependency installation and browser testing; verify responsive layouts, keyboard navigation, form submission and deployment; adjust any generated code based on test results.
- **Why selected:** To accelerate planning, code drafting and debugging while keeping the implementation editable and understandable.

### Developer validation checklist

- [ ] Install dependencies in frontend and backend.
- [ ] Set MongoDB Atlas URI and confirm `/api/health` reports connected.
- [ ] Submit contact, consultation, health-checkup and lead-magnet forms; confirm records and details appear in MongoDB.
- [ ] Submit a career application with a PDF/DOC/DOCX resume and verify the protected download endpoint.
- [ ] Configure SMTP and verify notification delivery, if credentials are available.
- [ ] Configure `ADMIN_API_KEY` and verify `/admin` displays records only with the correct key.
- [ ] Test all listed routes and unknown slugs.
- [ ] Test mobile widths, keyboard focus, reduced motion and WebGL fallback.
- [ ] Run `npm run build` in frontend and resolve all errors.
- [ ] Replace illustrative content with approved company information.
- [ ] Configure deployment environment variables, verify deployed API and frontend, and test production form submission.
- [ ] Commit source code and provide the repository and live URL in the submission.

## Deployment notes

Deploy the frontend as a Vite static site and the backend as a Node web service. Set `MONGODB_URI`, `CLIENT_ORIGIN` (exact deployed frontend origin), and `PORT` in the backend environment. Set `VITE_API_URL` to the deployed API base ending in `/api` before building the frontend. Ensure SPA route fallback is enabled by the frontend host so nested React Router URLs load on refresh.
