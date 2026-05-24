import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAppointments } from '../redux/appointmentsSlice'
import { fetchDoctors } from '../redux/doctorsSlice'
import { fetchPatients } from '../redux/patientsSlice'
import { fetchBilling } from '../redux/billingSlice'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'

export default function Dashboard() {
  const dispatch = useDispatch()
  const appointments = useSelector(s => s.appointments.items)
  const doctors = useSelector(s => s.doctors.items)
  const patients = useSelector(s => s.patients.items)
  const billing = useSelector(s => s.billing.items)
  const user = localStorage.getItem('mb_user') || 'User'

  useEffect(() => {
    dispatch(fetchAppointments())
    dispatch(fetchDoctors())
    dispatch(fetchPatients())
    dispatch(fetchBilling())
  }, [dispatch])

  const todayStr = new Date().toISOString().split('T')[0]
  const todayAppts = appointments.filter(a => a.date === todayStr)
  const pending = appointments.filter(a => a.status === 'Pending').length
  const totalRevenue = billing.filter(b => b.status === 'Paid').reduce((s, b) => s + Number(b.amount), 0)
  const availableDoctors = doctors.filter(d => d.available).length

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>Good morning, <span style={{ color: '#1d4ed8' }}>{user}</span> 👋</h1>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>Hospital overview · {new Date().toDateString()}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '24px' }}>
        <StatCard icon="📅" label="Today's Appointments" value={todayAppts.length} sub="scheduled today" color="#1d4ed8" bg="#eff6ff" />
        <StatCard icon="⏳" label="Pending" value={pending} sub="awaiting confirmation" color="#d97706" bg="#fef9c3" />
        <StatCard icon="👨‍⚕️" label="Available Doctors" value={availableDoctors} sub={`of ${doctors.length} total`} color="#16a34a" bg="#dcfce7" />
        <StatCard icon="💰" label="Total Revenue" value={`KSh ${totalRevenue.toLocaleString()}`} sub="from paid bills" color="#7c3aed" bg="#ede9fe" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Recent Appointments</h3>
            <Link to="/appointments" style={{ fontSize: '12px', color: '#1d4ed8', textDecoration: 'none' }}>View all →</Link>
          </div>
          {appointments.slice(0, 4).map(a => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{a.patientName}</p>
                <p style={{ fontSize: '11px', color: '#94a3b8' }}>{a.doctorName} · {a.date}</p>
              </div>
              <Badge label={a.status} />
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Quick Actions</h3>
          </div>
          {[
            { to: '/appointments', icon: '📅', label: 'Book Appointment', sub: 'Schedule a new visit', color: '#1d4ed8', bg: '#eff6ff' },
            { to: '/patients', icon: '👤', label: 'Register Patient', sub: 'Add a new patient record', color: '#16a34a', bg: '#dcfce7' },
            { to: '/billing', icon: '💳', label: 'Process Payment', sub: 'Manage billing records', color: '#7c3aed', bg: '#ede9fe' },
            { to: '/doctors', icon: '👨‍⚕️', label: 'Manage Doctors', sub: 'View doctor schedules', color: '#d97706', bg: '#fef9c3' },
          ].map(({ to, icon, label, sub, color, bg }) => (
            <Link key={to} to={to} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: '#f8fafc', borderRadius: '10px', marginBottom: '8px', textDecoration: 'none', transition: 'all 0.15s' }}>
              <div style={{ width: '36px', height: '36px', background: bg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{icon}</div>
              <div><p style={{ fontSize: '13px', fontWeight: 500, color }}>{label}</p><p style={{ fontSize: '11px', color: '#94a3b8' }}>{sub}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
