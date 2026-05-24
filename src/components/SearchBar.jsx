export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={{ position: 'relative', marginBottom: '16px' }}>
      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '14px' }}>🔍</span>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || 'Search...'} style={{ width: '100%', padding: '10px 14px 10px 36px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', color: '#1e293b', outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }} />
    </div>
  )
}
