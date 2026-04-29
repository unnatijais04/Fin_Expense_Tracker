import { useFinance } from '../context/FinanceContext'
import { getCat, ICONS } from '../utils/categories'
import styles from './TransactionItem.module.css'

export default function TransactionItem({ tx, showDelete = true }) {
  const { deleteTransaction, fmt } = useFinance()
  const cat = getCat(tx.cat)

  return (
    <div className={styles.item}>
      <div className={styles.icon} style={{ background: cat.bg, color: cat.color }}>
        {ICONS[tx.cat] || '💰'}
      </div>
      <div className={styles.info}>
        <div className={styles.desc}>{tx.desc}</div>
        <div className={styles.meta}>
          {tx.cat} · {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>
      <div className={`${styles.amt} ${tx.type === 'expense' ? styles.neg : styles.pos}`}>
        {tx.type === 'expense' ? '−' : '+'}{fmt(tx.amt)}
      </div>
      {showDelete && (
        <button className={styles.del} onClick={() => deleteTransaction(tx.id)} title="Delete">✕</button>
      )}
    </div>
  )
}
