// Utility per centralizzare la base URL delle API
const BASE_URL = import.meta.env.APP_API_URL || "carsbuy-data-cosimocrupi01-2cbc.e.aivencloud.com";

export function apiUrl(path) {
  // assicura che il path inizi con /
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${p}`;
}

export default BASE_URL;
