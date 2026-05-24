import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBilling, addBill, updateBill } from '../redux/billingSlice'
import SearchBar from '../components/SearchBar'
import Modal from '../components/Modal'
import Badge from '../components/Badge'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Billing() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector(s => s.billing)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ patientName: '', amount: '', status: 'Unpaid', method: '', date: '' })
  useEffect(() => { dispatch(fetchBilling()) }, [dispatch])
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const openEdit = (b) => { setForm(b); setEditing(b.id); setModal(true) }
  const handleSave = () => {
    const data = { ...form, amount: Number(form.amount) }
    if (editing) dispatch(updateBill({ id: editing, data }))
    else dispatch(addBill(data))
    setModal(false)
  }
  const filtered = items.filter(b => b.patientName?.toLowerCase().includes(search.toLowerCase()) || b.status?.toLowerCase().includes(search.toLowerCase()))
  const totalPaid = items.filter(b => b.status === 'Paid').reduce((s, b) => s + Number(b.amount), 0)
  const totalUnpaid = items.filter(b => b.status === 'Unpaid').reduce((s, b) => s + Number(b.amount), 0)
  const inp = { width: '100%', padding: '9px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#1e293b', outline: 'none' }
  if (loading) return <LoadingSpinner />
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div><h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>Billing</h1><p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{items.length} billing records</p></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
        <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '18px' }}>
          <p style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Total Collected</p>
          <p style={{ fontSize: '26px', fontWeight: 700, color: '#15803d' }}>KSh {totalPaid.toLocaleString()}</p>
        </div>
        <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '14px', padding: '18px' }}>
          <p style={{ fontSize: '11px', color: '#dc2626', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Outstanding</p>
          <p style={{ fontSize: '26px', fontWeight: 700, color: '#b91c1c' }}>KSh {totalUnpaid.toLocaleString()}</p>
        </div>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Search by patient or status..." />
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>{['Patient','Amount','Status','Method','Date','Actions'].map(h => <th key={h} style={{ textAlign: 'left', fontSize: '11px', color: '#64748b', fontWeight: 600, padding: '12px 16px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{b.patientName}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#1d4ed8' }}>KSh {Number(b.amount).toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}><Badge label={b.status} /></td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>{b.method || '—'}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#94a3b8' }}>{b.date}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => openEdit(b)} style={{ padding: '4px 10px', background: b.status === 'Unpaid' ? '#dcfce7' : '#eff6ff', border: `1px solid ${b.status === 'Unpaid' ? '#bbf7d0' : '#bfdbfe'}`, color: b.status === 'Unpaid' ? '#16a34a' : '#1d4ed8', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>
                    {b.status === 'Unpaid' ? 'Mark Paid' : 'Edit'}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '13px' }}>No billing records found</td></tr>}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title="Update Payment" onClose={() => setModal(false)} onSubmit={handleSave}>
          <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Status</label><select style={{ ...inp, marginTop: '6px', backgroundColor: '#f8fafc' }} value={form.status} onChange={e => set('status', e.target.value)}><option>Unpaid</option><option>Paid</option></select></div>
          <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Payment Method</label><select style={{ ...inp, marginTop: '6px', backgroundColor: '#f8fafc' }} value={form.method} onChange={e => set('method', e.target.value)}><option value="">Select...</option><option>M-Pesa</option><option>Cash</option><option>Insurance</option><option>Card</option></select></div>
          <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Date</label><input type="date" style={{ ...inp, marginTop: '6px' }} value={form.date} onChange={e => set('date', e.target.value)} /></div>
        </Modal>
      )}
    </div>
  )
}
