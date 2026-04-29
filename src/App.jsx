import { useState } from 'react'
import { FinanceProvider } from './context/FinanceContext'
import Sidebar from './components/Sidebar'
import AddTransactionModal from './components/AddTransactionModal'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import styles from './App.module.css'

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  analytics: 'Analytics',
  settings: 'Settings',
}

function AppInner() {
  const [view, setView] = useState('dashboard')
  const [showModal, setShowModal] = useState(false)

  const pages = { dashboard: Dashboard, transactions: Transactions, analytics: Analytics, settings: Settings }
  const Page = pages[view]

  return (
    <div className={styles.shell}>
      <Sidebar view={view} setView={setView} />
      <div className={styles.main}>
        <header className={styles.topbar}>
          <h1 className={styles.pageTitle}>{PAGE_TITLES[view]}</h1>
          <button className={styles.addBtn} onClick={() => setShowModal(true)}>
            + Add Transaction
          </button>
        </header>
        <main className={styles.content}>
          <Page />
        </main>
      </div>
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default function App() {
  return (
    <FinanceProvider>
      <AppInner />
    </FinanceProvider>
  )
}
