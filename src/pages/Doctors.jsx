import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoctors, addDoctor, updateDoctor, deleteDoctor } from '../redux/doctorsSlice'
import SearchBar from '../components/SearchBar'
import Modal from '../components/Modal'
import Badge from '../components/Badge'
import LoadingSpinner from '../components/LoadingSpinner'

const empty = { name: '', specialty: '', phone: '', email: '', experience: '', fee: '', available: true }

export default function Doctors() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector(s => s.doctors)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  useEffect(() => { dispatch(fetchDoctors()) }, [dispatch])
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const openAdd = () => { setForm(empty); setEditing(null); setModal(true) }
  const openEdit = (d) => { setForm(d); setEditing(d.id); setModal(true) }
  const handleSave = () => {
    if (!form.name || !form.specialty) return
    const data = { ...form, fee: Number(form.fee) }
    if (editing) dispatch(updateDoctor({ id: editing, data }))
    else dispatch(addDoctor(data))
    setModal(false)
  }
  const filtered = items.filter(d => d.name?.toLowerCase().includes(search.toLowerCase()) || d.specialty?.toLowerCase().includes(search.toLowerCase()))
  const inp = { width: '100%', padding: '9px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#1e293b', outline: 'none' }
  if (loading) return <LoadingSpinner />
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div><h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>Doctors</h1><p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{items.length} doctors registered</p></div>
        <button onClick={openAdd} style={{ padding: '9px 18px', background: '#1d4ed8', color: '#fff', borderRadius: '10px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>+ Add Doctor</button>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Search by name or specialty..." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '14px' }}>
        {filtered.map(d => (
          <div key={d.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👨‍⚕️</div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{d.name}</p>
                  <p style={{ fontSize: '12px', color: '#1d4ed8' }}>{d.specialty}</p>
                </div>
              </div>
              <Badge label={d.available ? 'Available' : 'Unavailable'} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '8px 10px' }}>
                <p style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '2px' }}>Experience</p>
                <p style={{ fontSize: '12px', fontWeight: 500, color: '#1e293b' }}>{d.experience}</p>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '8px 10px' }}>
                <p style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '2px' }}>Consultation Fee</p>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#1d4ed8' }}>KSh {Number(d.fee).toLocaleString()}</p>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '14px' }}>📞 {d.phone} · ✉️ {d.email}</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => openEdit(d)} style={{ flex: 1, padding: '7px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>Edit</button>
              <button onClick={() => { if (window.confirm('Delete?')) dispatch(deleteDoctor(d.id)) }} style={{ flex: 1, padding: '7px', background: '#fee2e2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>Delete</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No doctors found</div>}
      </div>
      {modal && (
        <Modal title={editing ? 'Edit Doctor' : 'Add Doctor'} onClose={() => setModal(false)} onSubmit={handleSave}>
          <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Full Name</label><input style={{ ...inp, marginTop: '6px' }} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Dr. John Doe" /></div>
          <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Specialty</label><input style={{ ...inp, marginTop: '6px' }} value={form.specialty} onChange={e => set('specialty', e.target.value)} placeholder="e.g. Cardiology" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Phone</label><input style={{ ...inp, marginTop: '6px' }} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="07XXXXXXXX" /></div>
            <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Fee (KSh)</label><input type="number" style={{ ...inp, marginTop: '6px' }} value={form.fee} onChange={e => set('fee', e.target.value)} /></div>
          </div>
          <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Email</label><input type="email" style={{ ...inp, marginTop: '6px' }} value={form.email} onChange={e => set('email', e.target.value)} placeholder="doctor@hospital.ke" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Experience</label><input style={{ ...inp, marginTop: '6px' }} value={form.experience} onChange={e => set('experience', e.target.value)} placeholder="e.g. 5 years" /></div>
            <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Availability</label>
              <select style={{ ...inp, marginTop: '6px', backgroundColor: '#f8fafc' }} value={form.available} onChange={e => set('available', e.target.value === 'true')}>
                <option value="true">Available</option><option value="false">Unavailable</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
