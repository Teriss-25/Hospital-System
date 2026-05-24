import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const USERS = [
  { username: 'admin', password: 'admin123', role: 'Admin', name: 'Admin User' },
  { username: 'doctor', password: 'doctor123', role: 'Doctor', name: 'Dr. James Mwangi' },
  { username: 'receptionist', password: 'rec123', role: 'Receptionist', name: 'Sarah Kamau' },
]

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const doLogin = (u) => {
    localStorage.setItem('mb_auth', 'true')
    localStorage.setItem('mb_user', u.name)
    localStorage.setItem('mb_role', u.role)
    navigate('/dashboard')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const found = USERS.find(u => u.username === username.trim().toLowerCase() && u.password === password.trim())
    if (found) doLogin(found)
    else setError('Invalid username or password')
  }

  const inp = { width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', color: '#1e293b', outline: 'none', marginTop: '6px', fontFamily: 'inherit' }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#eff6ff,#dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(59,130,246,0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 12px' }}>🏥</div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1e40af', marginBottom: '4px' }}>MediBook</h2>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>Hospital Appointment System</p>
        </div>
        {error && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', marginBottom: '16px' }}>{error}</div>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Username</label>
            <input style={inp} value={username} onChange={e => { setUsername(e.target.value); setError('') }} placeholder="e.g. admin" />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Password</label>
            <input type="password" style={inp} value={password} onChange={e => { setPassword(e.target.value); setError('') }} placeholder="••••••••" />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', color: '#fff', borderRadius: '10px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: '4px' }}>
            Sign in →
          </button>
        </form>
        <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', margin: '20px 0 12px' }}>or sign in as demo user</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {USERS.map(u => (
            <button key={u.username} onClick={() => doLogin(u)} style={{ width: '100%', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b', borderRadius: '10px', fontSize: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
              <span>{u.role === 'Admin' ? '👑' : u.role === 'Doctor' ? '👨‍⚕️' : '👩‍💼'} {u.name}</span>
              <span style={{ color: '#94a3b8' }}>{u.username} / {u.password}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
