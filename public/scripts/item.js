// public/scripts/item.js

let isEditMode = false;
let currentItemId = null;

// Get category ID from URL
const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get("id");

// Fetch and display items in the category
fetch(`/items?category_id=${categoryId}`)
  .then((response) => response.json())
  .then((data) => {
    const itemsTableBody = document.getElementById("items");
    data.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.quantity}</td>
        <td>$${parseFloat(item.price).toFixed(2)}</td>
        <td>
          <button class="btn edit-btn">Edit</button>
          <button class="btn delete-btn">Delete</button>
        </td>
      `;

      // Add event listeners for edit and delete buttons
      tr.querySelector(".edit-btn").addEventListener("click", () => {
        showEditItemForm(item);
      });
      tr.querySelector(".delete-btn").addEventListener("click", () => {
        deleteItem(item.id);
      });

      itemsTableBody.appendChild(tr);
    });
  });

// Show add item form
document.getElementById("show-add-item-form").addEventListener("click", () => {
  isEditMode = false;
  currentItemId = null;
  document.getElementById("add-item-form-container").style.display = "block";
  document.getElementById("add-item-form").reset();
});

// Close add item form
document.getElementById("close-add-item-form").addEventListener("click", () => {
  document.getElementById("add-item-form-container").style.display = "none";
});

// Add or edit item
document
  .getElementById("add-item-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("item-name").value;
    const description = document.getElementById("item-description").value;
    const quantity = document.getElementById("item-quantity").value;
    const price = parseFloat(
      document.getElementById("item-price").value
    ).toFixed(2);
    const adminPassword = prompt("Enter admin password:");

    if (isEditMode && currentItemId) {
      // Edit existing item
      fetch(`/items/${currentItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          quantity,
          price,
          adminPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Item updated successfully!");
          window.location.reload();
        });
    } else {
      // Add new item
      fetch("/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          category_id: categoryId,
          quantity,
          price,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Item added successfully!");
          window.location.reload();
        });
    }
  });

// Show edit item form
function showEditItemForm(item) {
  isEditMode = true;
  currentItemId = item.id;
  const formContainer = document.getElementById("add-item-form-container");
  formContainer.style.display = "block";
  document.getElementById("item-name").value = item.name;
  document.getElementById("item-description").value = item.description;
  document.getElementById("item-quantity").value = item.quantity;
  document.getElementById("item-price").value = parseFloat(item.price).toFixed(
    2
  );
}

// Delete item
function deleteItem(itemId) {
  const adminPassword = prompt("Enter admin password to delete this item:");
  fetch(`/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ adminPassword }),
  }).then((response) => {
    if (response.ok) {
      alert("Item deleted successfully!");
      window.location.reload();
    } else {
      alert("Failed to delete item. Please check the admin password.");
    }
  });
}

// Back button functionality
document.getElementById("back-button").addEventListener("click", () => {
  window.location.href = "/";
});
