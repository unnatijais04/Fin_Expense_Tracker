import { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import styles from './Settings.module.css'

export default function Settings() {
  const { budget, currency, transactions, setBudget, setCurrency, reset, fmt } = useFinance()
  const [budgetInput, setBudgetInput] = useState(budget)
  const [saved, setSaved] = useState(false)

  const handleSaveBudget = () => {
    if (budgetInput > 0) {
      setBudget(Number(budgetInput))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ transactions, budget, currency }, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'fintrack-export.json'
    a.click()
  }

  const handleReset = () => {
    if (window.confirm('Reset all data to defaults? This cannot be undone.')) reset()
  }

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.sectionTitle}>Budget & Currency</div>
        <div className={styles.row}>
          <div className={styles.rowLabel}>
            <div className={styles.rowName}>Monthly Budget</div>
            <div className={styles.rowDesc}>Set your spending limit for the month</div>
          </div>
          <div className={styles.rowControl}>
            <input
              type="number"
              className={styles.input}
              value={budgetInput}
              onChange={e => setBudgetInput(e.target.value)}
              min="1"
            />
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSaveBudget}>
              {saved ? '✓ Saved' : 'Save'}
            </button>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.row}>
          <div className={styles.rowLabel}>
            <div className={styles.rowName}>Currency</div>
            <div className={styles.rowDesc}>Display currency symbol</div>
          </div>
          <select className={styles.select} value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="₹">₹ Indian Rupee (INR)</option>
            <option value="$">$ US Dollar (USD)</option>
            <option value="€">€ Euro (EUR)</option>
            <option value="£">£ British Pound (GBP)</option>
          </select>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>Data Management</div>
        <div className={styles.stats}>
          {[
            { label: 'Total transactions', val: transactions.length },
            { label: 'Income entries', val: transactions.filter(t => t.type === 'income').length },
            { label: 'Expense entries', val: transactions.filter(t => t.type === 'expense').length },
          ].map(s => (
            <div key={s.label} className={styles.statBox}>
              <div className={styles.statVal}>{s.val}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleExport}>
            Export JSON
          </button>
          <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleReset}>
            Reset All Data
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>About</div>
        <div className={styles.aboutGrid}>
          {[
            ['App', 'FinTrack v1.0.0'],
            ['Stack', 'React 18 + Vite + Recharts'],
            ['Storage', 'localStorage (client-side)'],
            ['Author', 'Built for resume / portfolio'],
          ].map(([k, v]) => (
            <div key={k} className={styles.aboutRow}>
              <span className={styles.aboutKey}>{k}</span>
              <span className={styles.aboutVal}>{v}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
