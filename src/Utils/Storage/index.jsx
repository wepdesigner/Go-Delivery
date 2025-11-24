export function saveDeliveries(list) {
  localStorage.setItem("deliveries", JSON.stringify(list));
}

export function loadDeliveries() {
  const data = localStorage.getItem("deliveries");
  return data ? JSON.parse(data) : [];
}
