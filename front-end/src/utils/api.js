// Utility per centralizzare la base URL delle API
function addProtocolIfMissing(url) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

// legge la variabile definita in .env come VITE_API_HOST
const envVite = import.meta.env.VITE_API_HOST;
const raw = envVite || "http://localhost:8090";
const BASE_URL = addProtocolIfMissing(raw);

export function apiUrl(path) {
  // assicura che il path inizi con /
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${p}`;
}

export default BASE_URL;
