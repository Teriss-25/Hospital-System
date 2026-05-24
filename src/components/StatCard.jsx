export default function StatCard({ icon, label, value, sub, color, bg }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: bg || '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>{icon}</div>
      <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{label}</p>
      <p style={{ fontSize: '26px', fontWeight: 700, color: color || '#1e40af', marginBottom: '3px' }}>{value}</p>
      {sub && <p style={{ fontSize: '11px', color: '#94a3b8' }}>{sub}</p>}
    </div>
  )
}
