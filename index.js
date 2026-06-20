// =============================================
//  SHOPPING CART - script.js
// =============================================

// ── Grab all product cards ──────────────────
const cardBodies = document.querySelectorAll(".list-products .card-body");

// ── Helper: recalculate & display total price ──
function updateTotal() {
  let total = 0;

  cardBodies.forEach((cardBody) => {
    // Skip cards that have been deleted (hidden)
    if (cardBody.style.display === "none") return;

    const unitPriceText = cardBody.querySelector(".unit-price").textContent;
    const unitPrice = parseInt(unitPriceText);          // e.g. "100 $" → 100

    const quantity = parseInt(
      cardBody.querySelector(".quantity").textContent
    );                                                   // e.g. "2" → 2

    total += unitPrice * quantity;
  });

  document.querySelector(".total").textContent = total + " $";
}

// ── Wire up each product card ───────────────
cardBodies.forEach((cardBody) => {
  const plusBtn   = cardBody.querySelector(".fa-plus-circle");
  const minusBtn  = cardBody.querySelector(".fa-minus-circle");
  const trashBtn  = cardBody.querySelector(".fa-trash-alt");
  const heartBtn  = cardBody.querySelector(".fa-heart");
  const quantityEl = cardBody.querySelector(".quantity");

  // ── + button: increment quantity ──────────
  plusBtn.addEventListener("click", () => {
    let qty = parseInt(quantityEl.textContent);
    qty++;
    quantityEl.textContent = qty;
    updateTotal();
  });

  // ── - button: decrement quantity (min 0) ──
  minusBtn.addEventListener("click", () => {
    let qty = parseInt(quantityEl.textContent);
    if (qty > 0) {
      qty--;
      quantityEl.textContent = qty;
      updateTotal();
    }
  });

  // ── Trash button: remove card from cart ───
  trashBtn.addEventListener("click", () => {
    cardBody.style.display = "none";
    updateTotal();
  });

  // ── Heart button: toggle liked state ──────
  heartBtn.addEventListener("click", () => {
    heartBtn.classList.toggle("liked");
  });
});