const styles = {
  Confirmed: { background: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0' },
  Pending:   { background: '#fef9c3', color: '#ca8a04', border: '1px solid #fef08a' },
  Completed: { background: '#dbeafe', color: '#1d4ed8', border: '1px solid #bfdbfe' },
  Cancelled: { background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' },
  Paid:      { background: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0' },
  Unpaid:    { background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' },
  Available: { background: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0' },
  Unavailable: { background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' },
}
export default function Badge({ label }) {
  const s = styles[label] || { background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }
  return <span style={{ ...s, padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, display: 'inline-block' }}>{label}</span>
}
