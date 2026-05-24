import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API = 'http://localhost:3001/patients'
export const fetchPatients = createAsyncThunk('patients/fetchAll', async () => (await axios.get(API)).data)
export const addPatient = createAsyncThunk('patients/add', async (data) => (await axios.post(API, { ...data, id: Date.now().toString(), dateRegistered: new Date().toISOString().split('T')[0] })).data)
export const updatePatient = createAsyncThunk('patients/update', async ({ id, data }) => (await axios.patch(`${API}/${id}`, data)).data)
export const deletePatient = createAsyncThunk('patients/delete', async (id) => { await axios.delete(`${API}/${id}`); return id })
const slice = createSlice({
  name: 'patients',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (s) => { s.loading = true })
      .addCase(fetchPatients.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchPatients.rejected, (s) => { s.loading = false; s.error = 'Failed to load' })
      .addCase(addPatient.fulfilled, (s, a) => { s.items.push(a.payload) })
      .addCase(updatePatient.fulfilled, (s, a) => { const i = s.items.findIndex(x => x.id === a.payload.id); if (i !== -1) s.items[i] = a.payload })
      .addCase(deletePatient.fulfilled, (s, a) => { s.items = s.items.filter(x => x.id !== a.payload) })
  },
})
export default slice.reducer
