# analysis.me — React UI

Futuristic AI resume-intelligence interface. **UI-only** for now; the mock data
in `src/data/mock.js` will be swapped for the RAG API later.

## Run

```bash
cd frontend-react
npm install
npm run dev        # http://localhost:5173
```

The Vite dev server proxies `/api` → `http://localhost:8000` (the FastAPI
backend), so wiring real endpoints later needs no CORS changes.

## Structure

```
src/
  theme/ThemeContext.jsx   dark / light theme (persisted, respects OS preference)
  components/              Navbar, ThemeToggle, ScoreRing, StatBar, StatusBadge, Layout
  pages/
    Home.jsx               upload resumes, job description, analysis pipeline
    Chat.jsx               resume sidebar, candidate details, chat, match analytics
  data/mock.js             placeholder data (replace with API calls)
```

## Notes for API integration

- Home upload → `POST /api/upload`
- Chat send → `POST /api/ask-pdf?filename=...`
- Replace `resumes`, `candidate`, and `chatSeed` imports with fetched data.
```
