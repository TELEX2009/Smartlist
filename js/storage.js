const STORAGE_KEY = "sri-grocery-planner-list";

export function saveList(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function loadList() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function clearSavedList() {
  localStorage.removeItem(STORAGE_KEY);
}
