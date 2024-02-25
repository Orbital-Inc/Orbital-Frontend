window.addEventListener("load", function () {
  countdown();
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

function countdown() {
  // Set the date we're counting down to
  var countDownDate = new Date("Mar 1, 2024 00:00:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("countdown").innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdownDiv").classList.add("hidden");
      document.getElementById("vpsDiv").classList.remove("hidden");
    }
  }, 1000);
}

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
