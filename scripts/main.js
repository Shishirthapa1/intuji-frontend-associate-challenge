// Chart configuration
document.addEventListener("DOMContentLoaded", function () {
  setupAnalyticsChart();
  addInteractivity();
});

function setupAnalyticsChart() {
  const ctx = document.getElementById("analyticsChart").getContext("2d");

  // Data for the chart
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Income",
        data: [5000, 15000, 10000, 18000, 12000, 20000, 15000],
        borderColor: "#8e9cef",
        backgroundColor: "rgba(142, 156, 239, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#8e9cef",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Expenses",
        data: [3000, 7000, 8000, 4000, 6000, 5000, 8000],
        borderColor: "#f9a826",
        backgroundColor: "rgba(249, 168, 38, 0.05)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#f9a826",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#999",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#999",
          callback: function (value) {
            if (value >= 1000) {
              return value / 1000 + "k";
            }
            return value;
          },
        },
      },
    },
  };

  // Create the chart
  const analyticsChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}

function addInteractivity() {
  // Cards hover effect
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
      this.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-4px)";
      this.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
    });
  });

  // Saving items hover effect
  const savingItems = document.querySelectorAll(".saving-item");
  savingItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-2px)";
    });
  });

  // Transaction items hover effect
  const transactionItems = document.querySelectorAll(".transaction-item");
  transactionItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-2px)";
    });
  });

  // Dropdown toggle
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", function () {
      // For demonstration purposes only - would typically toggle a dropdown menu
      this.classList.toggle("active");
    });
  }

  // Format currency values
  formatCurrencyValues();
}

function formatCurrencyValues() {
  // Format currency for balance, savings, expenses, and income cards
  const currencyElements = document.querySelectorAll(".card-value");
  currencyElements.forEach((element) => {
    const value = parseFloat(element.textContent.replace(/[^0-9.-]+/g, ""));
    if (!isNaN(value)) {
      element.textContent = formatCurrency(value);
    }
  });

  // Format currency for saving amounts
  const savingAmounts = document.querySelectorAll(".current-amount");
  savingAmounts.forEach((element) => {
    const value = parseFloat(element.textContent.replace(/[^0-9.-]+/g, ""));
    if (!isNaN(value)) {
      element.textContent = formatCurrency(value);
    }
  });

  // Format currency for transaction amounts
  const transactionAmounts = document.querySelectorAll(
    ".transaction-amount .amount"
  );
  transactionAmounts.forEach((element) => {
    const value = parseFloat(element.textContent.replace(/[^0-9.-]+/g, ""));
    if (!isNaN(value)) {
      element.textContent = formatCurrency(value);
    }
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
