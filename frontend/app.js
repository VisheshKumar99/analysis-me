// Talks to the FastAPI backend over HTTP. Served from the same origin, so
// relative /api paths work whether hosted by FastAPI or a static server proxy.
const API = "/api";

let uploadedFilename = null;

const $ = (id) => document.getElementById(id);

$("upload-btn").addEventListener("click", async () => {
  const input = $("pdf-input");
  const status = $("upload-status");
  if (!input.files.length) {
    status.textContent = "Choose a PDF first.";
    return;
  }

  const form = new FormData();
  form.append("file", input.files[0]);

  status.textContent = "Uploading...";
  try {
    const res = await fetch(`${API}/upload`, { method: "POST", body: form });
    if (!res.ok) throw new Error((await res.json()).detail || res.statusText);
    const data = await res.json();
    uploadedFilename = data.filename;
    status.textContent = `Uploaded ${data.filename} (${data.pages} pages).`;
  } catch (err) {
    status.textContent = `Upload failed: ${err.message}`;
  }
});

$("ask-btn").addEventListener("click", async () => {
  const question = $("question").value.trim();
  const provider = $("provider").value || null;
  const usePdf = $("use-pdf").checked;
  const answerEl = $("answer");

  if (!question) {
    answerEl.textContent = "Type a question first.";
    return;
  }

  const btn = $("ask-btn");
  btn.disabled = true;
  answerEl.textContent = "Thinking...";

  try {
    let url = `${API}/ask`;
    if (usePdf) {
      if (!uploadedFilename) throw new Error("Upload a PDF before asking about it.");
      url = `${API}/ask-pdf?filename=${encodeURIComponent(uploadedFilename)}`;
    }
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, provider }),
    });
    if (!res.ok) throw new Error((await res.json()).detail || res.statusText);
    const data = await res.json();
    answerEl.textContent = data.answer;
  } catch (err) {
    answerEl.textContent = `Error: ${err.message}`;
  } finally {
    btn.disabled = false;
  }
});
