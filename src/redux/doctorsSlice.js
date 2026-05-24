import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API = 'http://localhost:3001/doctors'
export const fetchDoctors = createAsyncThunk('doctors/fetchAll', async () => (await axios.get(API)).data)
export const addDoctor = createAsyncThunk('doctors/add', async (data) => (await axios.post(API, { ...data, id: Date.now().toString() })).data)
export const updateDoctor = createAsyncThunk('doctors/update', async ({ id, data }) => (await axios.patch(`${API}/${id}`, data)).data)
export const deleteDoctor = createAsyncThunk('doctors/delete', async (id) => { await axios.delete(`${API}/${id}`); return id })
const slice = createSlice({
  name: 'doctors',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (s) => { s.loading = true })
      .addCase(fetchDoctors.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchDoctors.rejected, (s) => { s.loading = false; s.error = 'Failed to load' })
      .addCase(addDoctor.fulfilled, (s, a) => { s.items.push(a.payload) })
      .addCase(updateDoctor.fulfilled, (s, a) => { const i = s.items.findIndex(x => x.id === a.payload.id); if (i !== -1) s.items[i] = a.payload })
      .addCase(deleteDoctor.fulfilled, (s, a) => { s.items = s.items.filter(x => x.id !== a.payload) })
  },
})
export default slice.reducer
