# 📈 Stock Market Supervisor Dashboard

A **responsive** and **interactive** stock market dashboard built with **HTML, CSS, JavaScript, Bootstrap, and Chart.js**. The dashboard features **KPI cards, stock tables, and dynamic charts** to visualize stock performance.

## 🏗 Features

- **Key Performance Indicators (KPIs)**: Displays total stock value, growth rate, and performance score.
- **Favorite Stocks Table**: Interactive table with stock prices, percentage change, and trends.
- **Charts & Graphs**:
  - 📊 **Bar Chart**: Highlights top-performing stocks.
  - 🥧 **Pie Chart**: Shows stock distribution.
  - 📈 **Line Chart**: Visualizes stock trends over time.
  - ⚡ **Live Chart**: Updates stock prices dynamically every 5 seconds.
- **Dark Mode UI**: Modern, dark-themed design with smooth animations.
- **Responsive Design**: Fully functional across different screen sizes.

## 📦 Technologies Used

- 🏗 **HTML5**
- 🎨 **CSS3**
- 🖌 **Bootstrap 5**
- 📊 **Chart.js**
- ⚡ **JavaScript (Vanilla JS)**

## 📷 Screenshot

![Dashboard Screenshot](screenshot.png)

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/stock-market-dashboard.git
cd stock-market-dashboard
```

### 2️⃣ Open in Browser
```sh
Simply open index.html in your browser.
```
3️⃣ (Optional) Live Server
```sh
npx http-server .
```

### 📂 Project Structure
```graphql
📂 stock-market-dashboard
├── 📄 index.html       # Main HTML file
├── 🎨 styles.css       # Custom CSS for styling
├── 📜 script.js        # Main JavaScript logic
├── 📜 chart.js         # Chart.js configurations
├── 📷 screenshot.png   # Preview image
└── 📜 README.md        # Documentation
```
### 🛠 Functionality Overview
### 🔹 KPI Cards

- **Total Stocks Value**: Displays the total value of stocks dynamically.
- **Growth Rate**: Calculates and animates the stock portfolio's growth percentage.
- **Performance Score**: Assigns a rating based on stock performance (`A`, `B`, `C`, `D`, `F`).

### 🔹 Favorite Stocks Table

- Displays key stock details:  
  - **Stock Symbol**
  - **Price**
  - **Percentage Change**
  - **Trend Indicator** (📈 `▲` for increase, 📉 `▼` for decrease)
- **Clicking a stock row updates the line chart** to visualize its historical performance.

### 🔹 Charts & Graphs

- **📊 Bar Chart**: Displays **top-performing stocks** based on price.
- **🥧 Pie Chart**: Represents **stock distribution** in a portfolio.
- **📈 Line Chart**: Shows **historical stock trends** over the past **12 months**.
- **⚡ Live Chart**:
  - Updates dynamically **every 5 seconds**.
  - Shows real-time fluctuations for a selected stock.

### 🔹 Additional Features

- **Dark Mode UI** for better readability.
- **Smooth animations** on KPI updates.
- **Mobile-responsive** layout for all screen sizes.

  ## 📜 License
  This project is **open-source** and available under the [MIT License](LICENSE).

