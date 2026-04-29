import { createContext, useContext, useReducer, useEffect } from 'react'

const SEED = [
  { id: 1, desc: 'Monthly Salary', amt: 75000, cat: 'Salary', type: 'income', date: '2025-04-01' },
  { id: 2, desc: 'Grocery shopping', amt: 3200, cat: 'Food', type: 'expense', date: '2025-04-05' },
  { id: 3, desc: 'Electricity bill', amt: 1800, cat: 'Bills', type: 'expense', date: '2025-04-08' },
  { id: 4, desc: 'Uber rides', amt: 850, cat: 'Transport', type: 'expense', date: '2025-04-10' },
  { id: 5, desc: 'Netflix subscription', amt: 649, cat: 'Entertainment', type: 'expense', date: '2025-04-12' },
  { id: 6, desc: 'Freelance project', amt: 15000, cat: 'Freelance', type: 'income', date: '2025-04-15' },
  { id: 7, desc: 'Pharmacy', amt: 1200, cat: 'Health', type: 'expense', date: '2025-04-17' },
  { id: 8, desc: 'Zomato order', amt: 450, cat: 'Food', type: 'expense', date: '2025-04-19' },
  { id: 9, desc: 'Online shopping', amt: 2800, cat: 'Shopping', type: 'expense', date: '2025-04-21' },
  { id: 10, desc: 'Udemy course', amt: 999, cat: 'Education', type: 'expense', date: '2025-04-22' },
  { id: 11, desc: 'Gym membership', amt: 1500, cat: 'Health', type: 'expense', date: '2025-03-01' },
  { id: 12, desc: 'Salary', amt: 75000, cat: 'Salary', type: 'income', date: '2025-03-01' },
  { id: 13, desc: 'Rent payment', amt: 18000, cat: 'Bills', type: 'expense', date: '2025-03-05' },
  { id: 14, desc: 'Coffee shops', amt: 1200, cat: 'Food', type: 'expense', date: '2025-03-10' },
  { id: 15, desc: 'Freelance work', amt: 8000, cat: 'Freelance', type: 'income', date: '2025-03-20' },
]

function loadState() {
  try {
    const s = localStorage.getItem('fintrack_v2')
    if (s) return JSON.parse(s)
  } catch {}
  return { transactions: SEED, budget: 50000, currency: '₹' }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TX':
      return { ...state, transactions: [action.payload, ...state.transactions] }
    case 'DELETE_TX':
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) }
    case 'SET_BUDGET':
      return { ...state, budget: action.payload }
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload }
    case 'RESET':
      return { transactions: SEED, budget: 50000, currency: '₹' }
    default:
      return state
  }
}

const FinanceContext = createContext(null)

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadState)

  useEffect(() => {
    localStorage.setItem('fintrack_v2', JSON.stringify(state))
  }, [state])

  const addTransaction = (tx) => dispatch({ type: 'ADD_TX', payload: { ...tx, id: Date.now() } })
  const deleteTransaction = (id) => dispatch({ type: 'DELETE_TX', payload: id })
  const setBudget = (v) => dispatch({ type: 'SET_BUDGET', payload: v })
  const setCurrency = (v) => dispatch({ type: 'SET_CURRENCY', payload: v })
  const reset = () => dispatch({ type: 'RESET' })

  const fmt = (n) => state.currency + Math.round(n).toLocaleString('en-IN')

  return (
    <FinanceContext.Provider value={{ ...state, addTransaction, deleteTransaction, setBudget, setCurrency, reset, fmt }}>
      {children}
    </FinanceContext.Provider>
  )
}

export const useFinance = () => useContext(FinanceContext)
