import { useState, useMemo } from 'react'
import { useFinance } from '../context/FinanceContext'
import { CATEGORIES } from '../utils/categories'
import TransactionItem from '../components/TransactionItem'
import styles from './Transactions.module.css'

export default function Transactions() {
  const { transactions } = useFinance()
  const [filterCat, setFilterCat] = useState('All')
  const [filterType, setFilterType] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('date-desc')

  const cats = ['All', ...CATEGORIES.map(c => c.value)]

  const filtered = useMemo(() => {
    let list = [...transactions]
    if (filterCat !== 'All') list = list.filter(t => t.cat === filterCat)
    if (filterType !== 'All') list = list.filter(t => t.type === filterType)
    if (search) list = list.filter(t => t.desc.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'date-desc') list.sort((a, b) => new Date(b.date) - new Date(a.date))
    else if (sort === 'date-asc') list.sort((a, b) => new Date(a.date) - new Date(b.date))
    else if (sort === 'amt-desc') list.sort((a, b) => b.amt - a.amt)
    else if (sort === 'amt-asc') list.sort((a, b) => a.amt - b.amt)
    return list
  }, [transactions, filterCat, filterType, search, sort])

  return (
    <div className={styles.page}>
      <div className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className={styles.select} value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select className={styles.select} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amt-desc">Amount ↓</option>
          <option value="amt-asc">Amount ↑</option>
        </select>
      </div>

      <div className={styles.pills}>
        {cats.map(c => (
          <button
            key={c}
            className={`${styles.pill} ${filterCat === c ? styles.active : ''}`}
            onClick={() => setFilterCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className={styles.count}>{filtered.length} transaction{filtered.length !== 1 ? 's' : ''}</div>

      <div className={styles.list}>
        {filtered.map(tx => <TransactionItem key={tx.id} tx={tx} />)}
        {!filtered.length && (
          <div className={styles.empty}>No transactions match your filters.</div>
        )}
      </div>
    </div>
  )
}
