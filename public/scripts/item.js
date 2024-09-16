// public/scripts/item.js

// Get category ID from URL
const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get("id");

// Fetch and display items in the category
fetch(`/items?category_id=${categoryId}`)
  .then((response) => response.json())
  .then((data) => {
    const itemsList = document.getElementById("items");
    data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.description} - ${
        item.quantity
      } - $${parseFloat(item.price).toFixed(2)}`;

      // Add edit button for each item
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("btn");
      editButton.addEventListener("click", () => {
        showEditItemForm(item);
      });
      li.appendChild(editButton);

      // Add delete button for each item
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("btn");
      deleteButton.addEventListener("click", () => {
        deleteItem(item.id);
      });
      li.appendChild(deleteButton);

      itemsList.appendChild(li);
    });
  });

// Show add item form
document.getElementById("show-add-item-form").addEventListener("click", () => {
  document.getElementById("add-item-form-container").style.display = "block";
});

// Close add item form
document.getElementById("close-add-item-form").addEventListener("click", () => {
  document.getElementById("add-item-form-container").style.display = "none";
});

// Add new item
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
  });

// Show edit item form
function showEditItemForm(item) {
  const formContainer = document.getElementById("add-item-form-container");
  formContainer.style.display = "block";
  document.getElementById("item-name").value = item.name;
  document.getElementById("item-description").value = item.description;
  document.getElementById("item-quantity").value = item.quantity;
  document.getElementById("item-price").value = parseFloat(item.price).toFixed(
    2
  );

  const form = document.getElementById("add-item-form");
  form.removeEventListener("submit", addItemHandler);
  form.addEventListener("submit", function editItemHandler(event) {
    event.preventDefault();
    const name = document.getElementById("item-name").value;
    const description = document.getElementById("item-description").value;
    const quantity = document.getElementById("item-quantity").value;
    const price = parseFloat(
      document.getElementById("item-price").value
    ).toFixed(2);

    fetch(`/items/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        quantity,
        price,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Item updated successfully!");
        window.location.reload();
      });
  });
}

// Delete item
function deleteItem(itemId) {
  fetch(`/items/${itemId}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      alert("Item deleted successfully!");
      window.location.reload();
    } else {
      alert("Failed to delete item.");
    }
  });
}

// Back button functionality
document.getElementById("back-button").addEventListener("click", () => {
  window.location.href = "/";
});
