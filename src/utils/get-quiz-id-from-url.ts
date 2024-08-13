export function getQuizIdFromUrl() {
  const urlQuery = new URLSearchParams(location.search);
  return String(urlQuery.get("id"));
}
