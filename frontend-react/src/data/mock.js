// Placeholder data for the UI-only phase. Replaced by API calls later.

export const resumes = [
  {
    id: "r1",
    name: "Aarav Sharma",
    role: "Senior Frontend Engineer",
    file: "aarav_sharma.pdf",
    status: "analysing",
    match: 82,
  },
  {
    id: "r2",
    name: "Meera Nair",
    role: "ML Engineer",
    file: "meera_nair.pdf",
    status: "analysing",
    match: 68,
  },
  {
    id: "r3",
    name: "Vishesh Kumar",
    role: "Full-Stack Developer",
    file: "vishesh.pdf",
    status: "completed",
    match: 76,
  },
];

export const candidate = {
  name: "Vishesh Kumar",
  role: "Full-Stack Developer",
  location: "Bengaluru, IN",
  experience: "5 yrs",
  email: "vishesh@example.com",
  match: 76,
  verdict: "Strongly recommended",
  skills: ["React", "Python", "FastAPI", "LLM / RAG", "PostgreSQL", "AWS"],
  breakdown: [
    { label: "Skills match", value: 84 },
    { label: "Experience", value: 72 },
    { label: "Education", value: 65 },
    { label: "Culture fit", value: 79 },
  ],
};

export const chatSeed = [
  {
    id: 1,
    role: "ai",
    text: "Hi! I've analysed Vishesh's resume against the job description. Ask me anything about the fit.",
  },
  {
    id: 2,
    role: "user",
    text: "Does the candidate have production RAG experience?",
  },
  {
    id: 3,
    role: "ai",
    text: "Yes. The resume lists a document-QA system built with FastAPI and a vector retrieval pipeline, which maps directly to the RAG requirement in the JD.",
  },
];
