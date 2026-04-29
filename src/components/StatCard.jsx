import styles from './StatCard.module.css'

export default function StatCard({ label, value, delta, deltaLabel, accent }) {
  const isPositive = delta >= 0

  return (
    <div className={`${styles.card} ${styles[accent] || ''}`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {delta !== undefined && (
        <div className={`${styles.delta} ${isPositive ? styles.up : styles.down}`}>
          <span>{isPositive ? '▲' : '▼'}</span>
          {Math.abs(Math.round(delta)).toLocaleString('en-IN')} {deltaLabel}
        </div>
      )}
    </div>
  )
}
