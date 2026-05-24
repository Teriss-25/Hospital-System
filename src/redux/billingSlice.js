import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API = 'http://localhost:3001/billing'
export const fetchBilling = createAsyncThunk('billing/fetchAll', async () => (await axios.get(API)).data)
export const addBill = createAsyncThunk('billing/add', async (data) => (await axios.post(API, { ...data, id: Date.now().toString() })).data)
export const updateBill = createAsyncThunk('billing/update', async ({ id, data }) => (await axios.patch(`${API}/${id}`, data)).data)
const slice = createSlice({
  name: 'billing',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBilling.pending, (s) => { s.loading = true })
      .addCase(fetchBilling.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchBilling.rejected, (s) => { s.loading = false; s.error = 'Failed to load' })
      .addCase(addBill.fulfilled, (s, a) => { s.items.push(a.payload) })
      .addCase(updateBill.fulfilled, (s, a) => { const i = s.items.findIndex(x => x.id === a.payload.id); if (i !== -1) s.items[i] = a.payload })
  },
})
export default slice.reducer
