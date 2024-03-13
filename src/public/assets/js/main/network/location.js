document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").setView([30, -30], 1);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  var locations = [
    //Chicago
    { lat: 41.8758065, lng: -87.633756, name: "Chicago", ip: "69.171.209.1" },
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
      case "Frankfurt":
        L.marker([location.lat, location.lng])
          .addTo(map)
          .bindTooltip("Frankfurt<br>69.171.210.1");
        break;
    }
  });
});
