import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppointments, addAppointment, updateAppointment, deleteAppointment } from '../redux/appointmentsSlice'
import { fetchDoctors } from '../redux/doctorsSlice'
import { fetchPatients } from '../redux/patientsSlice'
import SearchBar from '../components/SearchBar'
import Modal from '../components/Modal'
import Badge from '../components/Badge'
import LoadingSpinner from '../components/LoadingSpinner'

const empty = { patientName: '', patientId: '', doctorName: '', doctorId: '', date: '', time: '', reason: '', status: 'Pending', fee: '' }

export default function Appointments() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector(s => s.appointments)
  const doctors = useSelector(s => s.doctors.items)
  const patients = useSelector(s => s.patients.items)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  useEffect(() => { dispatch(fetchAppointments()); dispatch(fetchDoctors()); dispatch(fetchPatients()) }, [dispatch])
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const openAdd = () => { setForm(empty); setEditing(null); setModal(true) }
  const openEdit = (a) => { setForm(a); setEditing(a.id); setModal(true) }
  const handleSave = () => {
    if (!form.patientName || !form.doctorName || !form.date) return
    if (editing) dispatch(updateAppointment({ id: editing, data: form }))
    else dispatch(addAppointment(form))
    setModal(false)
  }
  const handleDoctorChange = (e) => {
    const doc = doctors.find(d => d.id === e.target.value)
    if (doc) set('doctorName', doc.name); set('doctorId', doc.id); set('fee', doc.fee)
  }
  const handlePatientChange = (e) => {
    const pat = patients.find(p => p.id === e.target.value)
    if (pat) { set('patientName', pat.name); set('patientId', pat.id) }
  }
  const filtered = items.filter(a => a.patientName?.toLowerCase().includes(search.toLowerCase()) || a.doctorName?.toLowerCase().includes(search.toLowerCase()) || a.status?.toLowerCase().includes(search.toLowerCase()))
  const inp = { width: '100%', padding: '9px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#1e293b', outline: 'none' }
  if (loading) return <LoadingSpinner />
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div><h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>Appointments</h1><p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{items.length} total appointments</p></div>
        <button onClick={openAdd} style={{ padding: '9px 18px', background: '#1d4ed8', color: '#fff', borderRadius: '10px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>+ Book Appointment</button>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Search by patient, doctor or status..." />
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>{['Patient','Doctor','Date','Time','Reason','Status','Fee','Actions'].map(h => <th key={h} style={{ textAlign: 'left', fontSize: '11px', color: '#64748b', fontWeight: 600, padding: '12px 16px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{a.patientName}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>{a.doctorName}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>{a.date}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>{a.time}</td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.reason}</td>
                <td style={{ padding: '12px 16px' }}><Badge label={a.status} /></td>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#1d4ed8' }}>KSh {Number(a.fee).toLocaleString()}</td>
                <td style={{ padding: '12px 16px', display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEdit(a)} style={{ padding: '4px 10px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => { if (window.confirm('Delete?')) dispatch(deleteAppointment(a.id)) }} style={{ padding: '4px 10px', background: '#fee2e2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '13px' }}>No appointments found</td></tr>}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={editing ? 'Edit Appointment' : 'Book Appointment'} onClose={() => setModal(false)} onSubmit={handleSave}>
          <div>
            <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Patient</label>
            <select style={{ ...inp, marginTop: '6px', backgroundColor: '#f8fafc' }} value={form.patientId} onChange={handlePatientChange}>
              <option value="">Select patient...</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Doctor</label>
            <select style={{ ...inp, marginTop: '6px', backgroundColor: '#f8fafc' }} value={form.doctorId} onChange={handleDoctorChange}>
              <option value="">Select doctor...</option>
              {doctors.map(d => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Date</label><input type="date" style={{ ...inp, marginTop: '6px' }} value={form.date} onChange={e => set('date', e.target.value)} /></div>
            <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Time</label><input type="time" style={{ ...inp, marginTop: '6px' }} value={form.time} onChange={e => set('time', e.target.value)} /></div>
          </div>
          <div><label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Reason</label><input style={{ ...inp, marginTop: '6px' }} value={form.reason} onChange={e => set('reason', e.target.value)} placeholder="e.g. General checkup" /></div>
          <div>
            <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Status</label>
            <select style={{ ...inp, marginTop: '6px', backgroundColor: '#f8fafc' }} value={form.status} onChange={e => set('status', e.target.value)}>
              <option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option>
            </select>
          </div>
        </Modal>
      )}
    </div>
  )
}
