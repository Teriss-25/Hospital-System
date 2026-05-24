import { Link, useLocation, useNavigate } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/appointments', label: 'Appointments' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/patients', label: 'Patients' },
  { to: '/billing', label: 'Billing' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const user = localStorage.getItem('mb_user') || 'User'
  const role = localStorage.getItem('mb_role') || ''

  const handleLogout = () => {
    localStorage.removeItem('mb_auth')
    localStorage.removeItem('mb_user')
    localStorage.removeItem('mb_role')
    navigate('/login')
  }

  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '16px' }}>🏥</div>
        <span style={{ fontWeight: 700, fontSize: '16px', color: '#1e40af' }}>MediBook</span>
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {links.map(({ to, label }) => (
          <Link key={to} to={to} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', textDecoration: 'none', fontWeight: pathname === to ? 600 : 400, background: pathname === to ? '#eff6ff' : 'transparent', color: pathname === to ? '#1d4ed8' : '#64748b', transition: 'all 0.15s' }}>
            {label}
          </Link>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>{user}</p>
          <p style={{ fontSize: '10px', color: '#94a3b8' }}>{role}</p>
        </div>
        <button onClick={handleLogout} style={{ padding: '6px 14px', background: '#fee2e2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>
          Logout
        </button>
      </div>
    </nav>
  )
}
