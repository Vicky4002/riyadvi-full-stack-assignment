# 10–15 Minute Technical Walkthrough

## 1. Experience and design system
The rebuilt home page uses a cinematic dark technology direction, high-contrast typography, cyan accents, grid-based visual framing, clear conversion paths and responsive layouts. The internal pages share the same tokens and component treatment so the website feels like one product rather than unrelated screens.

## 2. 3D and motion
React Three Fiber and Three.js render the animated 3D hero. GSAP and ScrollTrigger animate the entrance and reveal content as the user scrolls. Lenis supplies smooth scrolling. CSS motion is restrained and `prefers-reduced-motion` is respected.

## 3. AI-assisted development
ChatGPT was used for architecture planning, implementation, debugging, and documentation. AI-generated output was reviewed and integrated into the existing component structure. See `docs/AI-USAGE.md` for the tool-use summary.

## 4. Full-stack architecture
React/Vite → REST API → Express → Mongoose → MongoDB Atlas. The backend includes request validation, Helmet, CORS, rate limits, enquiry and career-application persistence, resume uploads, and optional email notifications.

## 5. Dynamic content
`GET /api/content/services`, `/api/content/cases`, `/api/content/posts`, and `/api/content/jobs` serve page content. Built-in data provides a safe fallback. When MongoDB contains published content overrides, the API merges those overrides into the fallback collections and returns the result to the reusable frontend components.

The protected `/admin` page includes a Content Studio. With `ADMIN_API_KEY` configured, an administrator can create/update JSON content overrides, publish/unpublish them, refresh the content list, and delete an override to restore the built-in fallback. These writes are stored in the `ContentEntry` MongoDB collection.

## 6. API and database proof
- `GET /api/health` reports API status and MongoDB connection state.
- Enquiry forms submit to the leads API and are persisted in MongoDB.
- Career applications accept PDF/DOC/DOCX resumes and store the application record.
- Protected admin endpoints report enquiries, applications, and content overrides.
- Public content endpoints use database overrides when available and keep the site readable when no overrides have been created.

For a live demo, show the health endpoint, submit a test enquiry, verify it in the admin dashboard, and publish a harmless test content override from Content Studio.

## 7. Deployment checklist
1. Deploy the `backend` directory to Railway (or another Node host).
2. Configure `MONGODB_URI`, `CLIENT_ORIGIN` (the exact deployed frontend origin), and a long random `ADMIN_API_KEY` in the backend service.
3. Configure `VITE_API_URL=https://YOUR-BACKEND-HOST/api` in the Vercel frontend project.
4. Set Vercel's project Root Directory to `frontend`, Build Command to `npm run build`, and Output Directory to `dist`.
5. Trigger a fresh deployment and check `/api/health`, navigation, the 3D hero, form submission, and the protected admin area.
6. Never commit `.env` files or expose `ADMIN_API_KEY` in frontend environment variables.

## 8. Performance and limitations
The scene uses lightweight procedural geometry and should be checked on a mobile device and with reduced-motion settings. Before final submission, run a production build, inspect browser console/network errors, test a real form against the deployed database, and run Lighthouse. Concept case studies and job entries are clearly illustrative sample content and must not be represented as verified client work or confirmed vacancies.
