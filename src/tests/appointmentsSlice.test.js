import { describe, test, expect, vi } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import appointmentsReducer, { addAppointment, deleteAppointment, updateAppointment } from '../redux/appointmentsSlice'
import axios from 'axios'
vi.mock('axios')
const makeStore = () => configureStore({ reducer: { appointments: appointmentsReducer } })
const sample = { id: '1', patientName: 'John Kamau', doctorName: 'Dr. James', date: '2026-05-20', status: 'Pending', fee: 1500 }
describe('appointmentsSlice', () => {
  test('initial state is empty', () => { const store = makeStore(); expect(store.getState().appointments.items).toHaveLength(0) })
  test('addAppointment adds to state', async () => { axios.post.mockResolvedValue({ data: sample }); const store = makeStore(); await store.dispatch(addAppointment(sample)); expect(store.getState().appointments.items).toHaveLength(1) })
  test('deleteAppointment removes from state', async () => { axios.post.mockResolvedValue({ data: sample }); axios.delete.mockResolvedValue({}); const store = makeStore(); await store.dispatch(addAppointment(sample)); await store.dispatch(deleteAppointment('1')); expect(store.getState().appointments.items).toHaveLength(0) })
  test('updateAppointment patches status', async () => { axios.post.mockResolvedValue({ data: sample }); axios.patch.mockResolvedValue({ data: { ...sample, status: 'Confirmed' } }); const store = makeStore(); await store.dispatch(addAppointment(sample)); await store.dispatch(updateAppointment({ id: '1', data: { status: 'Confirmed' } })); expect(store.getState().appointments.items[0].status).toBe('Confirmed') })
  test('loading state is false after fetch', async () => { axios.get.mockResolvedValue({ data: [sample] }); const store = makeStore(); expect(store.getState().appointments.loading).toBe(false) })
})
