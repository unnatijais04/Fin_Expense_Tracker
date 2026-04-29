import { useFinance } from '../context/FinanceContext'
import { useStats } from '../hooks/useStats'
import styles from './Sidebar.module.css'

const NAV = [
  { id: 'dashboard', icon: '◈', label: 'Dashboard' },
  { id: 'transactions', icon: '≡', label: 'Transactions' },
  { id: 'analytics', icon: '⌇', label: 'Analytics' },
  { id: 'settings', icon: '◎', label: 'Settings' },
]

export default function Sidebar({ view, setView }) {
  const { budget, fmt } = useFinance()
  const { expense } = useStats()
  const pct = budget ? Math.min(100, (expense / budget) * 100) : 0
  const barColor = pct > 90 ? '#dc2626' : pct > 70 ? '#d97706' : '#2dd4bf'

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoMark}>FT</div>
        <div>
          <div className={styles.logoTitle}>FinTrack</div>
          <div className={styles.logoSub}>Personal Finance</div>
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV.map(n => (
          <button
            key={n.id}
            className={`${styles.navItem} ${view === n.id ? styles.active : ''}`}
            onClick={() => setView(n.id)}
          >
            <span className={styles.navIcon}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      <div className={styles.budgetCard}>
        <div className={styles.budgetHeader}>
          <span className={styles.budgetLabel}>Monthly Budget</span>
          <span className={styles.budgetPct}>{Math.round(pct)}%</span>
        </div>
        <div className={styles.budgetTrack}>
          <div className={styles.budgetFill} style={{ width: `${pct}%`, background: barColor }} />
        </div>
        <div className={styles.budgetNums}>
          <span>{fmt(expense)}</span>
          <span className={styles.budgetOf}>of {fmt(budget)}</span>
        </div>
      </div>
    </aside>
  )
}
