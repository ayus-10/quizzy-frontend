export function getQuizIdFromUrl() {
  const urlQuery = new URLSearchParams(location.search);
  return urlQuery.get("id") || "0";
}
