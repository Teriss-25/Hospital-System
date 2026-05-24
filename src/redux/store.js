import { configureStore } from '@reduxjs/toolkit'
import appointmentsReducer from './appointmentsSlice'
import doctorsReducer from './doctorsSlice'
import patientsReducer from './patientsSlice'
import billingReducer from './billingSlice'

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    doctors: doctorsReducer,
    patients: patientsReducer,
    billing: billingReducer,
  },
})
