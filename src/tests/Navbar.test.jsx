import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import Navbar from '../components/Navbar'
describe('Navbar', () => {
  test('renders brand name', () => { render(<MemoryRouter><Navbar /></MemoryRouter>); expect(screen.getByText('MediBook')).toBeInTheDocument() })
  test('renders Dashboard link', () => { render(<MemoryRouter><Navbar /></MemoryRouter>); expect(screen.getByText('Dashboard')).toBeInTheDocument() })
  test('renders Appointments link', () => { render(<MemoryRouter><Navbar /></MemoryRouter>); expect(screen.getByText('Appointments')).toBeInTheDocument() })
  test('renders Doctors link', () => { render(<MemoryRouter><Navbar /></MemoryRouter>); expect(screen.getByText('Doctors')).toBeInTheDocument() })
  test('renders Billing link', () => { render(<MemoryRouter><Navbar /></MemoryRouter>); expect(screen.getByText('Billing')).toBeInTheDocument() })
})
