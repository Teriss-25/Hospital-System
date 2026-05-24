export default function Modal({ title, onClose, onSubmit, children }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '460px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '20px' }}>{title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>{children}</div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '13px', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
          <button onClick={onSubmit} style={{ flex: 1, padding: '10px', borderRadius: '10px', background: '#1d4ed8', color: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: 600, border: 'none' }}>Save</button>
        </div>
      </div>
    </div>
  )
}
