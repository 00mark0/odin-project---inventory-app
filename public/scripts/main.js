// public/scripts/main.js

// Fetch and display categories
fetch("/categories")
  .then((response) => response.json())
  .then((data) => {
    const categoriesList = document.getElementById("categories");
    data.forEach((category) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `/category.html?id=${category.id}`;
      link.textContent = `${category.name} - ${category.description}`;
      li.appendChild(link);

      // Add delete button for each category
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("btn");
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteCategory(category.id);
      });
      li.appendChild(deleteButton);

      categoriesList.appendChild(li);
    });
  });

// Show add category form
document
  .getElementById("show-add-category-form")
  .addEventListener("click", () => {
    document.getElementById("add-category-form-container").style.display =
      "block";
    document.getElementById("add-category-form").reset();
  });

// Close add category form
document
  .getElementById("close-add-category-form")
  .addEventListener("click", () => {
    document.getElementById("add-category-form-container").style.display =
      "none";
  });

// Add category
document
  .getElementById("add-category-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    // Add new category
    fetch("/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Category added successfully!");
        window.location.reload();
      });
  });

// Delete category
function deleteCategory(categoryId) {
  const adminPassword = prompt("Enter admin password to delete this category:");
  fetch(`/categories/${categoryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ adminPassword }),
  }).then((response) => {
    if (response.ok) {
      alert("Category deleted successfully!");
      window.location.reload();
    } else {
      alert("Failed to delete category. Please check the admin password.");
    }
  });
}
