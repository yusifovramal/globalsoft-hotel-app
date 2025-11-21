import { RootState } from "../../app/store";

export const selectBooking = (state: RootState) => state.booking;
export const selectStep = (state: RootState) => state.booking.step;
export const selectConfig = (state: RootState) => state.booking.initialConfig;
export const selectDestination = (state: RootState) => state.booking.initialConfig?.destination;
export const selectBoardType = (state: RootState) => state.booking.initialConfig?.boardType;
export const selectDailySelections = (state: RootState) =>
  state.booking.dailySelections;

export const selectDailyTotalCosts = (state: RootState) =>
  state.booking.dailyTotalCosts;

export const selectGrandTotal = (state: RootState) =>
  state.booking.grandTotal;