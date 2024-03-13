document.addEventListener("DOMContentLoaded", function () {
  // Toggle the dropdown menu
  document
    .getElementById("dropdownSearchButton")
    .addEventListener("click", function () {
      document.getElementById("dropdownSearch").classList.toggle("hidden");
    });

  // Function to toggle the visibility of graphs based on checkbox state
  function toggleGraphVisibility() {
    const checkboxId = this.id; // The ID of the checkbox
    const containerId = checkboxId + "Container"; // Construct the ID of the corresponding container

    // Check if the container exists
    const container = document.getElementById(containerId);
    if (container) {
      // Toggle visibility based on the checkbox checked state
      if (this.checked) {
        container.classList.remove("hidden");
      } else {
        container.classList.add("hidden");
      }
    }
  }

  // Add change event listeners to all checkboxes within the dropdown
  document
    .querySelectorAll('#dropdownSearch input[type="checkbox"]')
    .forEach(function (checkbox) {
      checkbox.addEventListener("change", toggleGraphVisibility);
    });
});
