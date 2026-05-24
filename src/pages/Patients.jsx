import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPatients, addPatient, updatePatient, deletePatient } from '../redux/patientsSlice'
import SearchBar from '../components/SearchBar'
import Modal from '../components/Modal'
import LoadingSpinner from '../components/LoadingSpinner'

const empty = { name: '', age: '', gender: 'Male', phone: '', email: '', bloodGroup: 'O+', address: '' }

export default function Patients() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector(s => s.patients)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  useEffect(() => { dispatch(fetchPatients()) }, [dispatch])
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const openAdd = () => { setForm(empty); setEditing(null); setModal(true) }
  const openEdit = (p) => { setForm(p); setEditing(p.id); setModal(true) }
  const handleSave = () => {
    if (!form.name || !form.phone) return
    const data = { ...form, age: Number(form.age) }
    if (editing) dispatch(updatePatient({ id: editing, data }))
    else dispatch(addPatient(data))
    setModal(false)
  }
  const filtered = items.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()) || p.phone?.includes(search) || p.bloodGroup?.toLowerCase().includes(search.toLowerCase()))
  const inp = { width: '100%', padding: '9px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#1e293b', outline: 'none' }
  if (loading) return <LoadingSpinner />
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div><h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>Patients</h1><p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{items.length} patients registered</p></div>
        <button onClick={openAdd} style={{ padding: '9px 18px', background: '#1d4ed8', color: '#fff', borderRadius: '10px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>+ Add Patient</button>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Search by name, phone or blood group..." />
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>{['Name','Age','Gender','Phone','Blood Group','Address','Registered','Actions'].map(h => <th key={h} style={{ textAlign: 'left', fontSize: '11px', color: '#64748b', fontWeight: 600, padding: '12px 16px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{p.name}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>{p.age}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>{p.gender}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>{p.phone}</td>
                <td style={{ padding: '12px 16px' }}><span style={{ background: '#fee2e2', color: '#dc2626', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>{p.bloodGroup}</span></td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b' }}>{p.address}</td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: '#94a3b8' }}>{p.dateRegistered}</td>
                <td style={{ padding: '12px 16px', display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEdit(p)} style={{ padding: '4px 10px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => { if (window.confirm('Delete?')) dispatch(deletePatient(p.id)) }} style={{ padding: '4px 10px', background: '#fee2e2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '13px' }}>No patients found</td></tr>}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={editing ? 'Edit Patient' : 'Register Patient'} onClose={() => setModal(false)} onSubmit={handleSave}>
          <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Full Name</label><input style={{ ...inp, marginTop: '6px' }} value={form.name} onChange={e => set('name', e.target.value)} placeholder="John Kamau" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Age</label><input type="number" style={{ ...inp, marginTop: '6px' }} value={form.age} onChange={e => set('age', e.target.value)} /></div>
            <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Gender</label><select style={{ ...inp, marginTop: '6px', backgroundColor: '#f8fafc' }} value={form.gender} onChange={e => set('gender', e.target.value)}><option>Male</option><option>Female</option></select></div>
            <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Blood Group</label><select style={{ ...inp, marginTop: '6px', backgroundColor: '#f8fafc' }} value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)}>{['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}</select></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Phone</label><input style={{ ...inp, marginTop: '6px' }} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="07XXXXXXXX" /></div>
            <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Email</label><input type="email" style={{ ...inp, marginTop: '6px' }} value={form.email} onChange={e => set('email', e.target.value)} placeholder="patient@gmail.com" /></div>
          </div>
          <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Address</label><input style={{ ...inp, marginTop: '6px' }} value={form.address} onChange={e => set('address', e.target.value)} placeholder="Nairobi, Kenya" /></div>
        </Modal>
      )}
    </div>
  )
}
