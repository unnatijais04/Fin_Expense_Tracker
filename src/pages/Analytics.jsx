import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { useFinance } from '../context/FinanceContext'
import { useStats } from '../hooks/useStats'
import { getCat } from '../utils/categories'
import styles from './Analytics.module.css'

const TIP = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: '#888', marginBottom: 4 }}>{label || payload[0]?.name}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color || p.fill }}>
          {p.name ? `${p.name}: ` : ''}₹{Math.round(p.value).toLocaleString('en-IN')}
        </div>
      ))}
    </div>
  )
}

export default function Analytics() {
  const { transactions, fmt } = useFinance()
  const { income, expense, balance, categories, monthly } = useStats()

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amt, 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amt, 0)
  const avgTx = transactions.length ? totalExpense / transactions.filter(t => t.type === 'expense').length : 0

  const pieData = categories.slice(0, 6).map(([cat, amt]) => ({ name: cat, value: amt, color: getCat(cat).color }))

  return (
    <div className={styles.page}>
      <div className={styles.statsGrid}>
        {[
          { label: 'All-time income', val: fmt(totalIncome), color: '#2dd4bf' },
          { label: 'All-time expense', val: fmt(totalExpense), color: '#f87171' },
          { label: 'Net all-time', val: fmt(totalIncome - totalExpense), color: '#a78bfa' },
          { label: 'Avg expense / tx', val: fmt(avgTx), color: '#fbbf24' },
        ].map(s => (
          <div key={s.label} className={styles.stat}>
            <div className={styles.statLabel}>{s.label}</div>
            <div className={styles.statVal} style={{ color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div className={styles.chartBox}>
        <div className={styles.chartTitle}>Monthly Income vs Expense</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthly} barGap={6} barCategoryGap="30%">
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#555' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#555' }} axisLine={false} tickLine={false}
              tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<TIP />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="income" name="Income" fill="#2dd4bf" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Bar dataKey="expense" name="Expense" fill="#f87171" radius={[4, 4, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.row}>
        <div className={styles.chartBox}>
          <div className={styles.chartTitle}>Category Distribution (this month)</div>
          {pieData.length ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                  paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} opacity={0.85} />)}
                </Pie>
                <Tooltip content={<TIP />} />
                <Legend formatter={(val) => <span style={{ fontSize: 12, color: '#888' }}>{val}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : <div className={styles.empty}>No expense data this month</div>}
        </div>

        <div className={styles.chartBox}>
          <div className={styles.chartTitle}>Top Spending Categories</div>
          <div className={styles.rankList}>
            {categories.slice(0, 6).map(([cat, amt], i) => {
              const c = getCat(cat)
              return (
                <div key={cat} className={styles.rankRow}>
                  <span className={styles.rankNum}>{i + 1}</span>
                  <div className={styles.rankBar}>
                    <div className={styles.rankLabel}>
                      <span>{cat}</span>
                      <span className={styles.rankAmt}>{fmt(amt)}</span>
                    </div>
                    <div className={styles.rankTrack}>
                      <div className={styles.rankFill}
                        style={{ width: `${(amt / categories[0][1] * 100).toFixed(0)}%`, background: c.color }} />
                    </div>
                  </div>
                </div>
              )
            })}
            {!categories.length && <div className={styles.empty}>No data this month</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
