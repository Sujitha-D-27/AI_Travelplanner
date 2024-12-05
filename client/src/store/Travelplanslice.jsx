
import { createSlice } from '@reduxjs/toolkit';

const travelPlanSlice = createSlice({
  name: 'travelPlan',
  initialState: {
    plan: null,
  },
  reducers: {
    setTravelPlan: (state, action) => {
      state.plan = action.payload;
    },
    clearTravelPlan: (state) => {
      state.plan = null;
    },
  },
});

export const { setTravelPlan, clearTravelPlan } = travelPlanSlice.actions;
export default travelPlanSlice.reducer;
