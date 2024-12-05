
import { configureStore } from '@reduxjs/toolkit';
import travelPlanReducer from './Travelplanslice';

const store = configureStore({
  reducer: {
    travelPlan: travelPlanReducer,
  },
});

export default store;
