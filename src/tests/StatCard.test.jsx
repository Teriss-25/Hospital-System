import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import StatCard from '../components/StatCard'
describe('StatCard', () => {
  test('renders label', () => { render(<StatCard icon="📅" label="Appointments" value="12" sub="today" />); expect(screen.getByText('Appointments')).toBeInTheDocument() })
  test('renders value', () => { render(<StatCard icon="👨‍⚕️" label="Doctors" value="8" sub="available" />); expect(screen.getByText('8')).toBeInTheDocument() })
  test('renders sub text', () => { render(<StatCard icon="💰" label="Revenue" value="KSh 50,000" sub="this month" />); expect(screen.getByText('this month')).toBeInTheDocument() })
  test('renders icon', () => { render(<StatCard icon="🏥" label="Patients" value="120" sub="registered" />); expect(screen.getByText('🏥')).toBeInTheDocument() })
})
