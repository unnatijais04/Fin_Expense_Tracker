import { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { CATEGORIES } from '../utils/categories'
import styles from './AddTransactionModal.module.css'

export default function AddTransactionModal({ onClose }) {
  const { addTransaction } = useFinance()
  const [type, setType] = useState('expense')
  const [desc, setDesc] = useState('')
  const [amt, setAmt] = useState('')
  const [cat, setCat] = useState('Food')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!desc.trim() || !amt || !date) { setError('All fields are required'); return }
    if (parseFloat(amt) <= 0) { setError('Amount must be greater than 0'); return }
    addTransaction({ desc: desc.trim(), amt: parseFloat(amt), cat, type, date })
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>New Transaction</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <div className={styles.typeToggle}>
          <button
            type="button"
            className={`${styles.typeBtn} ${type === 'expense' ? styles.activeExpense : ''}`}
            onClick={() => { setType('expense'); setCat('Food') }}
          >
            Expense
          </button>
          <button
            type="button"
            className={`${styles.typeBtn} ${type === 'income' ? styles.activeIncome : ''}`}
            onClick={() => { setType('income'); setCat('Salary') }}
          >
            Income
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Description</label>
            <input
              type="text"
              placeholder="e.g. Grocery shopping"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              autoFocus
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Amount (₹)</label>
              <input
                type="number"
                placeholder="0.00"
                min="0.01"
                step="0.01"
                value={amt}
                onChange={e => setAmt(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <select value={cat} onChange={e => setCat(e.target.value)}>
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.footer}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.btnSubmit}>Add Transaction</button>
          </div>
        </form>
      </div>
    </div>
  )
}
