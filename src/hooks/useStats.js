import { useMemo } from 'react'
import { useFinance } from '../context/FinanceContext'

export function useStats() {
  const { transactions } = useFinance()

  return useMemo(() => {
    const now = new Date()
    const thisMonth = transactions.filter(t => {
      const d = new Date(t.date)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    const lastMonth = transactions.filter(t => {
      const d = new Date(t.date)
      const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear()
    })

    const income = thisMonth.filter(t => t.type === 'income').reduce((s, t) => s + t.amt, 0)
    const expense = thisMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amt, 0)
    const lastIncome = lastMonth.filter(t => t.type === 'income').reduce((s, t) => s + t.amt, 0)
    const lastExpense = lastMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amt, 0)

    const catMap = {}
    thisMonth.filter(t => t.type === 'expense').forEach(t => {
      catMap[t.cat] = (catMap[t.cat] || 0) + t.amt
    })
    const categories = Object.entries(catMap).sort((a, b) => b[1] - a[1])

    const monthlyMap = {}
    transactions.forEach(t => {
      const d = new Date(t.date)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      if (!monthlyMap[key]) monthlyMap[key] = { income: 0, expense: 0, label: d.toLocaleString('en-IN', { month: 'short', year: '2-digit' }) }
      monthlyMap[key][t.type] += t.amt
    })
    const monthly = Object.entries(monthlyMap).sort((a, b) => a[0].localeCompare(b[0])).slice(-6).map(([, v]) => v)

    return { income, expense, balance: income - expense, thisMonth, lastIncome, lastExpense, categories, monthly }
  }, [transactions])
}
