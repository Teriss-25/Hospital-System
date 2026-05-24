import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Badge from '../components/Badge'
describe('Badge', () => {
  test('renders Confirmed', () => { render(<Badge label="Confirmed" />); expect(screen.getByText('Confirmed')).toBeInTheDocument() })
  test('renders Pending', () => { render(<Badge label="Pending" />); expect(screen.getByText('Pending')).toBeInTheDocument() })
  test('renders Completed', () => { render(<Badge label="Completed" />); expect(screen.getByText('Completed')).toBeInTheDocument() })
  test('renders Paid', () => { render(<Badge label="Paid" />); expect(screen.getByText('Paid')).toBeInTheDocument() })
  test('renders Cancelled', () => { render(<Badge label="Cancelled" />); expect(screen.getByText('Cancelled')).toBeInTheDocument() })
})
