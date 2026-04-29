import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useFinance } from '../context/FinanceContext'
import { useStats } from '../hooks/useStats'
import StatCard from '../components/StatCard'
import TransactionItem from '../components/TransactionItem'
import { getCat } from '../utils/categories'
import styles from './Dashboard.module.css'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: '#888', marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color }}>
          {p.name}: ₹{Math.round(p.value).toLocaleString('en-IN')}
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { transactions, fmt } = useFinance()
  const { income, expense, balance, lastIncome, lastExpense, categories, monthly } = useStats()

  const recent = transactions.slice(0, 6)
  const maxCat = categories[0]?.[1] || 1

  return (
    <div className={styles.page}>
      <div className={styles.cards}>
        <StatCard label="Income this month" value={fmt(income)} accent="income"
          delta={income - lastIncome} deltaLabel="vs last month" />
        <StatCard label="Spent this month" value={fmt(expense)} accent="expense"
          delta={expense - lastExpense} deltaLabel="vs last month" />
        <StatCard label="Net balance" value={fmt(balance)} accent="balance" />
      </div>

      <div className={styles.charts}>
        <div className={styles.chartBox}>
          <div className={styles.chartTitle}>Monthly Overview</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthly} barGap={4}>
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#555' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="income" name="Income" fill="#2dd4bf" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="expense" name="Expense" fill="#f87171" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartBox}>
          <div className={styles.chartTitle}>Spending by Category</div>
          <div className={styles.catList}>
            {categories.slice(0, 6).map(([cat, amt]) => {
              const c = getCat(cat)
              return (
                <div key={cat} className={styles.catRow}>
                  <div className={styles.catLabel}>{cat}</div>
                  <div className={styles.catTrack}>
                    <div className={styles.catFill}
                      style={{ width: `${(amt / maxCat * 100).toFixed(0)}%`, background: c.color }} />
                  </div>
                  <div className={styles.catAmt}>{fmt(amt)}</div>
                </div>
              )
            })}
            {!categories.length && <div className={styles.empty}>No expenses this month</div>}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>Recent Transactions</span>
        </div>
        <div className={styles.txList}>
          {recent.map(tx => <TransactionItem key={tx.id} tx={tx} />)}
          {!recent.length && <div className={styles.empty}>No transactions yet.</div>}
        </div>
      </div>
    </div>
  )
}
