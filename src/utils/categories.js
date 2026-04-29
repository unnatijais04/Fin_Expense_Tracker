export const CATEGORIES = [
  { value: 'Food', label: '🍔 Food & Dining', color: '#2dd4bf', bg: '#0d3330' },
  { value: 'Transport', label: '🚗 Transport', color: '#60a5fa', bg: '#0c1f3d' },
  { value: 'Shopping', label: '🛍️ Shopping', color: '#f472b6', bg: '#3d0c25' },
  { value: 'Bills', label: '💡 Bills & Utilities', color: '#fbbf24', bg: '#3d2800' },
  { value: 'Health', label: '🏥 Health', color: '#f87171', bg: '#3d0c0c' },
  { value: 'Entertainment', label: '🎬 Entertainment', color: '#a78bfa', bg: '#1e1040' },
  { value: 'Education', label: '📚 Education', color: '#34d399', bg: '#0d2d1e' },
  { value: 'Salary', label: '💼 Salary', color: '#4ade80', bg: '#0a2e15' },
  { value: 'Freelance', label: '💻 Freelance', color: '#2dd4bf', bg: '#0d3330' },
  { value: 'Other', label: '📦 Other', color: '#9ca3af', bg: '#1f1f1f' },
]

export const getCat = (val) => CATEGORIES.find(c => c.value === val) || CATEGORIES[CATEGORIES.length - 1]

export const ICONS = {
  Food:'🍔', Transport:'🚗', Shopping:'🛍️', Bills:'💡',
  Health:'🏥', Entertainment:'🎬', Education:'📚',
  Salary:'💼', Freelance:'💻', Other:'📦'
}
