export function filterGroceries(items, term = "", category = "all") {
  const query = term.trim().toLowerCase();

  return items.filter(item => {
    const matchesSearch =
      !query ||
      item.en.toLowerCase().includes(query) ||
      item.ta.includes(term.trim());

    const matchesCategory =
      category === "all" || item.category === category;

    return matchesSearch && matchesCategory;
  });
}
