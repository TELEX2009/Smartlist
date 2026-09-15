import { groceries, units } from "./data/groceries.js";
import { saveList, loadList, clearSavedList } from "./js/storage.js";
import { filterGroceries } from "./js/search.js";
import { generatePrintableList } from "./js/pdf.js";

const groceryList = document.getElementById("groceryList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const selectedCount = document.getElementById("selectedCount");
const clearBtn = document.getElementById("clearBtn");
const pdfBtn = document.getElementById("pdfBtn");

let selectedItems = loadList();

const categories = [...new Set(groceries.map(item => item.category))].sort();
categories.forEach(category => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categoryFilter.appendChild(option);
});

function getSelected(id) {
  return selectedItems.find(item => item.id === id);
}

function render() {
  const filtered = filterGroceries(
    groceries,
    searchInput.value,
    categoryFilter.value
  );

  groceryList.innerHTML = filtered.map(item => {
    const selected = getSelected(item.id);
    const quantity = selected?.quantity ?? 1;
    const unit = selected?.unit ?? item.unit;

    return `
      <article class="card" data-id="${item.id}">
        <h3>${item.ta}</h3>
        <small>${item.en} • ${item.category}</small>

        <div class="controls">
          <input class="qty" type="number" min="0.1" step="0.1" value="${quantity}">
          <select class="unit">
            ${units.map(u => `<option value="${u}" ${u === unit ? "selected" : ""}>${u}</option>`).join("")}
          </select>
          <button class="add-btn ${selected ? "active" : ""}">
            ${selected ? "Added" : "Add"}
          </button>
        </div>
      </article>
    `;
  }).join("");

  selectedCount.textContent = selectedItems.length;
}

groceryList.addEventListener("click", event => {
  const button = event.target.closest(".add-btn");
  if (!button) return;

  const card = button.closest(".card");
  const id = Number(card.dataset.id);
  const grocery = groceries.find(item => item.id === id);
  const qty = Number(card.querySelector(".qty").value) || 1;
  const unit = card.querySelector(".unit").value;

  const existingIndex = selectedItems.findIndex(item => item.id === id);

  if (existingIndex >= 0) {
    selectedItems.splice(existingIndex, 1);
  } else {
    selectedItems.push({
      ...grocery,
      quantity: qty,
      unit
    });
  }

  saveList(selectedItems);
  render();
});

groceryList.addEventListener("change", event => {
  const card = event.target.closest(".card");
  if (!card) return;

  const id = Number(card.dataset.id);
  const selected = getSelected(id);
  if (!selected) return;

  selected.quantity = Number(card.querySelector(".qty").value) || 1;
  selected.unit = card.querySelector(".unit").value;
  saveList(selectedItems);
});

searchInput.addEventListener("input", render);
categoryFilter.addEventListener("change", render);

clearBtn.addEventListener("click", () => {
  if (!selectedItems.length) return;
  if (!confirm("Clear the current grocery list?")) return;

  selectedItems = [];
  clearSavedList();
  render();
});

pdfBtn.addEventListener("click", () => {
  generatePrintableList(selectedItems);
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js").catch(console.error);
}

render();
