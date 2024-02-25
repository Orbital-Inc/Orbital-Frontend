window.addEventListener("load", function () {
  countdown();
});

document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").setView([30, -30], 1);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  var locations = [
    //Chicago
    { lat: 41.8758065, lng: -87.633756, name: "Chicago", ip: "69.171.209.1" },
    //Toronto
    { lat: 43.644547, lng: -79.3869217, name: "Toronto", ip: "69.171.211.1" },
    //Frankfurt
    { lat: 50.109812, lng: 8.742867, name: "Frankfurt", ip: "69.171.210.1" },
  ];

  locations.forEach(function (location) {
    switch (location.name) {
      case "Chicago":
        L.marker([location.lat, location.lng])
          .addTo(map)
          .bindTooltip("Chicago<br>69.171.209.1");
        break;
      case "Toronto":
        L.marker([location.lat, location.lng])
          .addTo(map)
          .bindTooltip("Toronto (Mitigation Only)<br>69.171.211.1");
        break;
      case "Frankfurt":
        L.marker([location.lat, location.lng])
          .addTo(map)
          .bindTooltip("Frankfurt (Mitigation Only)<br>69.171.210.1");
        break;
    }
  });
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
      document.getElementById("homeDiv").classList.remove("hidden");
    }
  }, 1000);
}
