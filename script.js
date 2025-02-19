document.addEventListener('DOMContentLoaded', () => {
  let portfolioPrices = {};
  let lineChartPrices = {};

  const stockColors = {
    AAPL: '#8884d8',
    GOOG: '#82ca9d',
    AMZN: '#ffc658',
    MSFT: '#ff7300',
    TSLA: '#36a2eb'
  };

  const allStocks = ['AAPL', 'GOOG', 'AMZN', 'MSFT', 'TSLA'];
  let stableLineData = {};
  let initializedStableData = false;

  const animateValue = (el, start, end, duration, isCurrency = false, suffix = '') => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      let currentValue = progress * (end - start) + start;
      if (isCurrency) {
        currentValue = currentValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      } else {
        currentValue = Math.floor(currentValue) + suffix;
      }
      el.textContent = currentValue;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const generateStockPriceDataSimple = (count, startPrice, maxChange = 2) => {
    const data = [startPrice];
    for (let i = 1; i < count; i++) {
      const change = Math.floor(Math.random() * (2 * maxChange + 1) - maxChange);
      let newPrice = data[i - 1] + change;
      if (newPrice < 0) newPrice = 0;
      data.push(newPrice);
    }
    return data;
  };

  const generateStockPriceDataPercentage = (count, startPrice, maxPercent = 0.02) => {
    const data = [startPrice];
    for (let i = 1; i < count; i++) {
      const factor = (Math.random() * (2 * maxPercent)) - maxPercent; 
      let newPrice = data[i - 1] * (1 + factor);
      if (newPrice < 0) newPrice = 0;
      data.push(Math.round(newPrice));
    }
    return data;
  };

  const generateMonthLabels = () => {
    const months = [];
    const currentDate = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const month = date.toLocaleString('default', { month: 'short' });
      months.push(month);
    }
    return months;
  };

  const initializeStableLineData = () => {
    if (initializedStableData) return;
    initializedStableData = true;
    for (const stk of allStocks) {
      const startPriceForLine = 120 + Math.random() * 60; // between 120 and 180
      stableLineData[stk] = generateStockPriceDataPercentage(12, Math.round(startPriceForLine), 0.02);
    }
  };

  // Bar Chart
  const ctxBar = document.getElementById('barChart').getContext('2d');
  const barData = allStocks.map(() => {
    const start = 120 + Math.random() * 60;
    return generateStockPriceDataSimple(1, Math.round(start))[0]; 
  });
  const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: allStocks,
      datasets: [{
        label: 'Stock Price ($)',
        data: barData,
        backgroundColor: allStocks.map(stock => stockColors[stock])
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, ticks: { color: '#c7c7c7' }, title: { display: true, text: 'Price ($)', color: '#ffffff' } },
        x: { ticks: { color: '#c7c7c7' }, title: { display: true, text: 'Stock', color: '#ffffff' } }
      },
      plugins: {
        legend: { labels: { color: '#c7c7c7' } },
        tooltip: { backgroundColor: '#2a2a3c', titleColor: '#ffffff', bodyColor: '#c7c7c7' }
      }
    }
  });

  // Pie Chart
  const ctxPie = document.getElementById('pieChart').getContext('2d');
  const pieDataValues = allStocks.map(() => {
    const start = 120 + Math.random() * 60;
    return generateStockPriceDataSimple(1, Math.round(start))[0];
  });
  const pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: allStocks,
      datasets: [{
        data: pieDataValues,
        backgroundColor: allStocks.map(stock => stockColors[stock]),
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#c7c7c7' } },
        tooltip: { backgroundColor: '#2a2a3c', titleColor: '#ffffff', bodyColor: '#c7c7c7' }
      }
    }
  });

  let currentLineChart = null;

  const initializeLineChart = (stock) => {
    initializeStableLineData();

    const ctxLine = document.getElementById('lineChart').getContext('2d');
    if (currentLineChart) currentLineChart.destroy();

    const labels = generateMonthLabels();
    let datasets = [];
    lineChartPrices = {};

    if (stock === 'All') {
      allStocks.forEach((stk) => {
        lineChartPrices[stk] = { first: stableLineData[stk][0], last: stableLineData[stk][stableLineData[stk].length - 1] };
        datasets.push({
          label: `${stk} Closing Price ($)`,
          data: stableLineData[stk],
          borderColor: stockColors[stk],
          fill: false,
          tension: 0.4
        });
      });
    } else {
      lineChartPrices[stock] = { first: stableLineData[stock][0], last: stableLineData[stock][stableLineData[stock].length - 1] };
      datasets.push({
        label: `${stock} Closing Price ($)`,
        data: stableLineData[stock],
        borderColor: stockColors[stock],
        fill: false,
        tension: 0.4
      });
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: false, ticks: { color: '#c7c7c7' }, title: { display: true, text: 'Price ($)', color: '#ffffff' } },
        x: { ticks: { color: '#c7c7c7' }, title: { display: true, text: 'Month', color: '#ffffff' } }
      },
      plugins: {
        legend: { labels: { color: '#c7c7c7' } },
        tooltip: { backgroundColor: '#2a2a3c', titleColor: '#ffffff', bodyColor: '#c7c7c7' }
      }
    };

    currentLineChart = new Chart(ctxLine, {
      type: 'line',
      data: { labels: labels, datasets: datasets },
      options: options
    });
  };

  const stockSelect = document.getElementById('stockSelect');
  stockSelect.addEventListener('change', (event) => {
    const selectedStock = event.target.value;
    initializeLineChart(selectedStock);
  });

  let currentLiveChart = null;
  let liveData = [];

  const initializeLiveChart = (stock) => {
    const ctxLive = document.getElementById('liveChart').getContext('2d');
    if (currentLiveChart) currentLiveChart.destroy();

    const startPrice = portfolioPrices[stock] !== undefined ? portfolioPrices[stock] : 150;
    liveData = generateStockPriceDataSimple(10, startPrice, 1); // minimal daily changes

    const data = {
      labels: Array.from({ length: 10 }, (_, i) => `Point ${i + 1}`),
      datasets: [{
        label: `${stock} Live Data ($)`,
        data: liveData,
        borderColor: '#ff7300',
        backgroundColor: 'rgba(255, 115, 0, 0.2)',
        fill: true,
        tension: 0.4
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        y: { beginAtZero: true, ticks: { color: '#c7c7c7' }, title: { display: true, text: 'Price ($)', color: '#ffffff' } },
        x: { ticks: { color: '#c7c7c7' }, title: { display: true, text: 'Point', color: '#ffffff' } }
      },
      plugins: {
        legend: { labels: { color: '#c7c7c7' } },
        tooltip: { backgroundColor: '#2a2a3c', titleColor: '#ffffff', bodyColor: '#c7c7c7' }
      }
    };

    currentLiveChart = new Chart(ctxLive, {
      type: 'line',
      data: data,
      options: options
    });
  };

  const liveStockSelect = document.getElementById('liveStockSelect');
  liveStockSelect.addEventListener('change', (event) => {
    const selectedStock = event.target.value;
    initializeLiveChart(selectedStock);
  });

  setInterval(() => {
    if (!currentLiveChart) return;
    liveData.shift();
    const lastPrice = liveData[liveData.length - 1] || 150;
    const change = Math.floor(Math.random() * 3 - 1); 
    let newPrice = lastPrice + change;
    if (newPrice < 0) newPrice = 0;
    liveData.push(newPrice);
    currentLiveChart.data.datasets[0].data = liveData;
    currentLiveChart.update();
  }, 5000);

  const populateSpecificTable = (tableId) => {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    if (!tableBody) {
      console.error(`Error: Table body for "${tableId}" not found.`);
      return;
    }

    tableBody.innerHTML = '';
    
    let totalValue = 0;
    portfolioPrices = {};

    allStocks.forEach(stock => {
      const basePrice = 140 + Math.random() * 20; // between 140 and 160
      const pctChangeFactor = (Math.random() * 0.01) - 0.005; // ±0.5%
      const finalPrice = basePrice * (1 + pctChangeFactor);
      const finalPctChange = pctChangeFactor * 100;
      const trend = finalPctChange >= 0 ? '▲' : '▼';
      
      totalValue += finalPrice;
      portfolioPrices[stock] = parseFloat(finalPrice.toFixed(2));

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${stock}</td>
        <td>$${finalPrice.toFixed(2)}</td>
        <td>${finalPctChange.toFixed(2)}%</td>
        <td>${trend}</td>
      `;
      tableBody.appendChild(row);
    });

    // Add click event to each row to update line chart on stock click
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
      row.addEventListener('click', () => {
        const stockSymbol = row.cells[0].textContent;
        // Update the stockSelect dropdown if needed
        const stockSelect = document.getElementById('stockSelect');
        stockSelect.value = stockSymbol;
        // Initialize the line chart for the clicked stock
        initializeLineChart(stockSymbol);
      });
    });
    
    updateKPIs(totalValue);
  };

  const updateKPIs = (totalValue) => {
    initializeLineChart(document.getElementById('stockSelect').value);

    allStocks.forEach(stock => {
      stableLineData[stock][stableLineData[stock].length - 1] = portfolioPrices[stock];
    });

    initializeLineChart(document.getElementById('stockSelect').value);

    let totalPctChangeSum = 0;
    allStocks.forEach(stock => {
      const { first, last } = lineChartPrices[stock];
      const pctChange = ((last - first) / first) * 100;
      totalPctChangeSum += pctChange;
    });

    const growthRate = totalPctChangeSum;
    let performanceScore;
    if (growthRate > 20) performanceScore = 'A';
    else if (growthRate > 10) performanceScore = 'B';
    else if (growthRate >= 0) performanceScore = 'C';
    else if (growthRate >= -10) performanceScore = 'D';
    else performanceScore = 'F';

    const totalStocksEl = document.getElementById('totalStocks');
    const growthRateEl = document.getElementById('growthRate');
    const performanceScoreEl = document.getElementById('performanceScore');

    animateValue(totalStocksEl, 0, totalValue, 1500, true);
    setTimeout(() => {
      animateValue(growthRateEl, 0, growthRate, 1500, false, '%');
    }, 1600);

    setTimeout(() => {
      performanceScoreEl.textContent = performanceScore;
      performanceScoreEl.style.transition = 'transform 0.5s, opacity 0.5s';
      performanceScoreEl.style.transform = 'scale(1)';
      performanceScoreEl.style.opacity = '1';
    }, 3200);

    const currentlySelectedLiveStock = document.getElementById('liveStockSelect').value;
    initializeLiveChart(currentlySelectedLiveStock);

    const newBarData = allStocks.map(stock => portfolioPrices[stock]);
    barChart.data.datasets[0].data = newBarData;
    barChart.update();

    const newPieData = allStocks.map(stock => portfolioPrices[stock]);
    pieChart.data.datasets[0].data = newPieData;
    pieChart.update();

    const table = document.querySelector('#stocksTable1 tbody');
    const rows = table.querySelectorAll('tr');
    rows.forEach((row, index) => {
      const stock = allStocks[index];
      const { first, last } = lineChartPrices[stock];
      const pctChange = ((last - first) / first) * 100;
      row.cells[2].textContent = pctChange.toFixed(2) + '%';
      row.cells[3].textContent = pctChange >= 0 ? '▲' : '▼';
    });
  };

  populateSpecificTable('stocksTable1');
});
