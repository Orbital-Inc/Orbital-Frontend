window.addEventListener("load", function () {
  updateSliderValue("cores", "coresSpan", "Virtual Cores");
  updateSliderValue("memory", "memorySpan", "Memory", "Gbs");
  updateSliderValue("diskSpace", "diskSpaceSpan", "Disk Space", "Gbs");
  updateSliderValue("portSpeed", "portSpeedSpan", "Port Speed", "Gbps");

  updatePricing("cores", "coresPricingSpan", pricing.cores);
  updatePricing("memory", "memoryPricingSpan", pricing.memory);
  updatePricing("diskSpace", "diskSpacePricingSpan", pricing.diskSpace);
  updatePricing("portSpeed", "portSpeedPricingSpan", pricing.portSpeed);
  updatePricing("ipAddresses", "ipAddressesPricingSpan", pricing.ipAddresses);
  updateSummary();
});

function updateSliderValue(sliderId, spanId, fieldName, unit = "") {
  const slider = document.getElementById(sliderId);
  const span = document.getElementById(spanId);

  // Update the span when the slider value changes
  slider.addEventListener("input", function () {
    span.textContent = `${fieldName} (${slider.value}${unit})`;
  });
}

const pricing = {
  cores: 3.5,
  memory: 1,
  diskSpace: 0.05,
  portSpeed: 0,
  ipAddresses: 0,
  location: 0,
};
const taxRate = 0.15; // 15%

function updatePricing(sliderId, spanId, pricePerUnit) {
  const slider = document.getElementById(sliderId);
  const span = document.getElementById(spanId);

  slider.addEventListener("input", function () {
    const totalPrice = (slider.value * pricePerUnit).toFixed(2);
    let item = sliderId.charAt(0).toUpperCase() + sliderId.slice(1);
    item = item.replace(/([A-Z])/g, " $1").trim();
    span.textContent = `${item}: ${slider.value} x $${pricePerUnit.toFixed(
      2
    )} = $${totalPrice}`;
    updateSummary();
  });
}

function updateSummary() {
  const cores = document.getElementById("cores").value;
  const memory = document.getElementById("memory").value;
  const diskSpace = document.getElementById("diskSpace").value;
  // Assuming portSpeed and other factors might influence the total cost
  const subtotal = (
    cores * pricing.cores +
    memory * pricing.memory +
    diskSpace * pricing.diskSpace
  ).toFixed(2);
  const taxes = (subtotal * taxRate).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(taxes)).toFixed(2);

  document.getElementById(
    "subtotalPricingSpan"
  ).textContent = `Subtotal: $${subtotal}`;
  document.getElementById("taxesSpan").textContent = `Taxes: $${taxes}`;
  document.getElementById("totalPricingSpan").textContent = `Total: $${total}`;
}

async function OrderAsync() {
  //todo
}
