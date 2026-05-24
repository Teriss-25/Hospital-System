import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API = 'http://localhost:3001/appointments'
export const fetchAppointments = createAsyncThunk('appointments/fetchAll', async () => (await axios.get(API)).data)
export const addAppointment = createAsyncThunk('appointments/add', async (data) => (await axios.post(API, { ...data, id: Date.now().toString() })).data)
export const updateAppointment = createAsyncThunk('appointments/update', async ({ id, data }) => (await axios.patch(`${API}/${id}`, data)).data)
export const deleteAppointment = createAsyncThunk('appointments/delete', async (id) => { await axios.delete(`${API}/${id}`); return id })
const slice = createSlice({
  name: 'appointments',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (s) => { s.loading = true })
      .addCase(fetchAppointments.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchAppointments.rejected, (s) => { s.loading = false; s.error = 'Failed to load' })
      .addCase(addAppointment.fulfilled, (s, a) => { s.items.unshift(a.payload) })
      .addCase(updateAppointment.fulfilled, (s, a) => { const i = s.items.findIndex(x => x.id === a.payload.id); if (i !== -1) s.items[i] = a.payload })
      .addCase(deleteAppointment.fulfilled, (s, a) => { s.items = s.items.filter(x => x.id !== a.payload) })
  },
})
export default slice.reducer
