const ingressPacketsConfig = {
  type: "line",
  data: {
    labels: ["1:00PM", "1:01PM", "1:02PM", "1:03PM", "1:04PM"],
    datasets: [
      {
        label: "Packets Dropped",
        backgroundColor: "#0694a2",
        borderColor: "#0694a2",
        data: [43, 48, 40, 54, 67],
        fill: false,
      },
      {
        label: "Packets Allowed",
        backgroundColor: "#facc15",
        borderColor: "#facc15",
        data: [60, 10, 30, 54, 21],
        fill: false,
      },
      {
        label: "Packets Total",
        backgroundColor: "#7e3af2",
        borderColor: "#7e3af2",
        data: [10, 35, 40, 20, 88],
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    /**
     * Default legends are ugly and impossible to style.
     * See examples in charts.html to add your own legends
     *  */
    legend: {
      display: false,
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Time",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
      },
    },
  },
};

const ingressTrafficConfig = {
  type: "line",
  data: {
    labels: ["1:00PM", "1:01PM", "1:02PM", "1:03PM", "1:04PM"],
    datasets: [
      {
        label: "Bits Dropped",
        backgroundColor: "#0694a2",
        borderColor: "#0694a2",
        data: [43, 48, 40, 54, 67],
        fill: false,
      },
      {
        label: "Bits Allowed",
        backgroundColor: "#facc15",
        borderColor: "#facc15",
        data: [60, 10, 30, 54, 21],
        fill: false,
      },
      {
        label: "Bits Total",
        backgroundColor: "#7e3af2",
        borderColor: "#7e3af2",
        data: [10, 35, 40, 20, 88],
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    /**
     * Default legends are ugly and impossible to style.
     * See examples in charts.html to add your own legends
     *  */
    legend: {
      display: false,
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Time",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
      },
    },
  },
};

// change this to the id of your chart element in HMTL
const ingressPacketsCtx = document.getElementById("ingressPacketsChart");
window.myLine = new Chart(ingressPacketsCtx, ingressPacketsConfig);

const ingressTrafficCtx = document.getElementById("ingressTrafficChart");
window.myLine = new Chart(ingressTrafficCtx, ingressTrafficConfig);

// change this to the id of your chart element in HMTL
const egressPacketsCtx = document.getElementById("egressPacketsChart");
window.myLine = new Chart(egressPacketsCtx, ingressPacketsConfig);

const egressTrafficCtx = document.getElementById("egressTrafficChart");
window.myLine = new Chart(egressTrafficCtx, ingressTrafficConfig);

/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */
const egressConfig = {
  type: "line",
  data: {
    labels: ["1:00PM", "1:01PM", "1:02PM", "1:03PM", "1:04PM"],
    datasets: [
      {
        label: "Packets Dropped",
        backgroundColor: "#0694a2",
        borderColor: "#0694a2",
        data: [43, 48, 40, 54, 67],
        fill: false,
      },
      {
        label: "Bits Dropped",
        backgroundColor: "#7e3af2",
        borderColor: "#7e3af2",
        data: [32, 12, 45, 23, 57],
        fill: false,
      },
      {
        label: "Packets Allowed",
        backgroundColor: "#1c64f2",
        borderColor: "#1c64f2",
        data: [60, 10, 30, 54, 21],
        fill: false,
      },
      {
        label: "Bits Allowed",
        backgroundColor: "#facc15",
        borderColor: "#facc15",
        data: [10, 35, 40, 20, 88],
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    /**
     * Default legends are ugly and impossible to style.
     * See examples in charts.html to add your own legends
     *  */
    legend: {
      display: false,
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Time",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
      },
    },
  },
};

// change this to the id of your chart element in HMTL
const egressCtx = document.getElementById("egressAggregatedChart");
window.myLine = new Chart(egressCtx, egressConfig);

const ingressConfig = {
  type: "line",
  data: {
    labels: ["1:00PM", "1:01PM", "1:02PM", "1:03PM", "1:04PM"],
    datasets: [
      {
        label: "Bits Allowed",
        backgroundColor: "#facc15",
        borderColor: "#facc15",
        data: [500, 600, 700, 800, 900], // Example data for Bits Allowed
        fill: false,
        yAxisID: "y-axis-bits",
      },
      {
        label: "Bits Dropped",
        backgroundColor: "#7e3af2",
        borderColor: "#7e3af2",
        data: [50, 60, 70, 80, 90], // Example data for Bits Dropped
        fill: false,
        yAxisID: "y-axis-bits",
      },
      {
        label: "Packets Allowed",
        backgroundColor: "#1c64f2",
        borderColor: "#1c64f2",
        data: [100, 150, 200, 250, 300], // Example data for Packets Allowed
        fill: false,
        yAxisID: "y-axis-packets",
      },
      {
        label: "Packets Dropped",
        backgroundColor: "#0694a2",
        borderColor: "#0694a2",
        data: [10, 15, 20, 25, 444], // Example data for Packets Dropped
        fill: false,
        yAxisID: "y-axis-packets",
      },
    ],
  },
  options: {
    responsive: true,
    hoverMode: "index",
    stacked: false,
    title: {
      display: false,
      text: "Network Traffic Analysis: Bits and Packets",
    },
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-bits",
          scaleLabel: {
            display: true,
            labelString: "Bits (Allowed/Dropped)",
          },
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-packets",
          gridLines: {
            drawOnChartArea: false,
          },
          scaleLabel: {
            display: true,
            labelString: "Packets (Allowed/Dropped)",
          },
        },
      ],
    },
  },
};

// change this to the id of your chart element in HMTL
const ingressCtx = document.getElementById("ingressAggregatedChart");
window.myLine = new Chart(ingressCtx, ingressConfig);

/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */
const pieConfig = {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [25, 50, 25], // Representing the proportions for each category
        backgroundColor: [
          "#1c64f2", // Blue for "Rate limited"
          "#0694a2", // Teal for "Allowed"
          "#7e3af2", // Purple for "Dropped"
        ],
        label: "Traffic Distribution",
      },
    ],
    labels: ["Rate limited", "Allowed", "Dropped"],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
    legend: {
      display: false, // Set to true if you want the chart's legend to display
    },
  },
};

// change this to the id of your chart element in HMTL
const pieCtx = document.getElementById("trafficPercentageChart");
window.myPie = new Chart(pieCtx, pieConfig);

/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */
const barConfig = {
  type: "bar",
  data: {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"], // Example time intervals over 24 hours
    datasets: [
      {
        label: "Packets Dropped",
        backgroundColor: "#0694a2", // Teal for "Packets Dropped"
        data: [5, 10, 15, 20, 25, 30], // Sample data
      },
      {
        label: "Bits Dropped",
        backgroundColor: "#7e3af2", // Purple for "Bits Dropped"
        data: [30, 25, 20, 15, 10, 5], // Sample data
      },
      {
        label: "Packets Allowed",
        backgroundColor: "#1c64f2",
        data: [60, 10, 30, 54, 67, 11],
      },
      {
        label: "Bits Allowed",
        backgroundColor: "#facc15",
        data: [10, 35, 40, 20, 88, 33],
      },
    ],
  },
  options: {
    responsive: true,
    legend: {
      display: false, // Set to true if you want the chart's legend to display
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

const barsCtx = document.getElementById("past24HoursChart");
window.myBar = new Chart(barsCtx, barConfig);

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
