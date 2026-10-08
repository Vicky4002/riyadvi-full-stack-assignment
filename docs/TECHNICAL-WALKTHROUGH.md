# 10–15 Minute Technical Walkthrough

## 1. Design
The design uses Riyadvi's gold/black identity with futuristic depth, glass surfaces, strong typography and restrained digital effects. The interface is designed around conversion actions: consultation, contact, health checkup and lead magnet.

## 2. 3D
React Three Fiber and Three.js provide the interactive hero/system visuals. GSAP and ScrollTrigger handle scroll-driven motion. Lenis provides smooth scrolling. The scene uses lightweight geometry and responsive rendering limits.

## 3. AI
AI was used for architecture exploration, implementation acceleration, debugging, content structure and documentation. Generated output was reviewed and manually modified rather than submitted unchanged.

## 4. Development
The frontend uses reusable components and data-driven routes. The backend uses Express route modules, Mongoose models and middleware for validation/error handling.

## 5. Architecture
React/Vite → `/api` → Express → Mongoose → MongoDB Atlas.

## 6. Dynamic Content
Services, projects, posts and jobs are represented as data objects and rendered through reusable route templates. A future CMS/API can replace the local content module without changing the page architecture.

## 7. Performance
3D rendering is kept lightweight, animation is isolated, and mobile layouts reduce visual workload. A final Lighthouse run is required before submission.

## 8. Challenges
The main debugging issue was malformed generated CSS causing PostCSS's `Unclosed bracket` error. A second issue was incorrect middleware spreading in the applications route. Both were corrected and syntax-checked.

## 9. Production improvements
With another 1–2 weeks: move content into a CMS, add authenticated admin roles, store resumes in object storage, add email/WhatsApp/Calendly integrations, add analytics, add automated tests and introduce route-level code splitting.
