export function loadFromLocal(itemName) {
  return JSON.parse(localStorage.getItem(itemName));
}

export function saveToLocal(itemName, itemValue) {
  return localStorage.setItem(itemName, JSON.stringify(itemValue));
}
