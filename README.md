# FinTrack — Personal Finance Tracker

A full-featured personal expense tracker built with **React 18 + Vite + Recharts**, structured as a multi-component application.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🏗️ Project Structure

```
src/
├── context/
│   └── FinanceContext.jsx     # Global state with useReducer + localStorage
├── hooks/
│   └── useStats.js            # Derived stats hook (memoized calculations)
├── utils/
│   └── categories.js          # Category constants & helpers
├── components/
│   ├── Sidebar.jsx            # Navigation + budget progress
│   ├── StatCard.jsx           # Reusable metric card
│   ├── TransactionItem.jsx    # Single transaction row
│   └── AddTransactionModal.jsx # Add transaction form modal
├── pages/
│   ├── Dashboard.jsx          # Overview with charts
│   ├── Transactions.jsx       # Full list with search/filter/sort
│   ├── Analytics.jsx          # Deep analytics with recharts
│   └── Settings.jsx           # Budget, currency, data management
├── App.jsx                    # Root layout + routing state
└── main.jsx                   # Entry point
```

## ✨ Features

- **Dashboard** — Income/expense/balance cards, monthly bar chart, category breakdown
- **Transactions** — Search, filter by category & type, sort by date/amount
- **Analytics** — Monthly comparison chart, donut chart, ranking list
- **Settings** — Custom monthly budget, multi-currency (₹/$€£), JSON export, reset
- **Persistent** — All data saved to `localStorage`
- **Animated** — Modal slide-in, bar fill transitions, hover states

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| Recharts | Charts (BarChart, PieChart) |
| CSS Modules | Scoped styling |
| localStorage | Client-side persistence |

## 🚢 Deploy

**Vercel** (recommended):
```bash
npm run build
# Drag dist/ folder to vercel.com, or use Vercel CLI
```

**GitHub Pages**:
```bash
npm run build
# Push dist/ to gh-pages branch
```

**Netlify**:
- Connect repo → build command: `npm run build` → publish dir: `dist`
