import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingState, StepType, StepTypes } from "../../types/bookingTypes";
import { BookingFormData } from "../../schemas/InitialConfigSchema";
import { hotels, meals } from "../../data/bookingData";

const initialState: BookingState = {
  initialConfig: null,
  dailySelections: [],
  step: StepTypes.initialConfig,
  dailyTotalCosts: [],
  grandTotal: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<BookingFormData>) {
      state.initialConfig = action.payload;
      state.dailySelections = Array.from(
        { length: action.payload.numOfDays },
        (_, i) => ({
          day: i + 1,
          startDate: action.payload.startDate,
          hotelId: null,
          lunchId: null,
          dinnerId: null,
        })
      );
    },
    setDaySelection(
      state,
      action: PayloadAction<{
        day: number;
        startDate?: Date;
        hotelId?: number;
        lunchId?: number;
        dinnerId?: number;
      }>
    ) {
      const day = state.dailySelections.find(
        (d) => d.day === action.payload.day
      );
      if (day) {
        if (action.payload.hotelId !== undefined)
          day.hotelId = action.payload.hotelId;
        if (action.payload.lunchId !== undefined)
          day.lunchId = action.payload.lunchId;
        if (action.payload.dinnerId !== undefined)
          day.dinnerId = action.payload.dinnerId;
      }
    },
    deleteDaySelection(state, action: PayloadAction<number>) {
      state.dailySelections = state.dailySelections.filter(
        (d) => d.day !== action.payload
      );
    },
    calculateTotals(state) {
      if (!state.initialConfig) return;

      const destinationHotels =
        hotels[state.initialConfig.destination as keyof typeof hotels];
      const mealOptions =
        meals[state.initialConfig.destination as keyof typeof meals];

      const dailyTotals = state.dailySelections.map((day) => {
        const hotel = destinationHotels.find((h) => h.id === day.hotelId);
        const lunch = mealOptions.lunch.find((m) => m.id === day.lunchId);
        const dinner = mealOptions.dinner.find((m) => m.id === day.dinnerId);

        const total =
          (hotel?.price || 0) + (lunch?.price || 0) + (dinner?.price || 0);

        return {
          day: day.day,
          startDate: day.startDate,
          total,
          hotel,
          lunch,
          dinner,
        };
      });

      const grandTotal = dailyTotals.reduce((sum, d) => sum + d.total, 0);

      state.dailyTotalCosts = dailyTotals;
      state.grandTotal = grandTotal;
    },
    handleStep(state, action: PayloadAction<StepType>) {
      state.step = action.payload;
    },
  },
});

export const {
  setConfig,
  setDaySelection,
  handleStep,
  calculateTotals,
  deleteDaySelection,
} = bookingSlice.actions;
export default bookingSlice.reducer;
