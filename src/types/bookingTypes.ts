import { BookingFormData } from "../schemas/InitialConfigSchema";

export interface DailySelection {
  day: number;
  startDate: string;
  hotelId: number | null;
  lunchId?: number | null;
  dinnerId?: number | null;
}

export interface DailySelectionItem {
  id: number;
  name: string;
  price: number;
}

export interface DailyTotal {
  day: number;
  startDate: string;
  hotel?: DailySelectionItem;
  lunch?: DailySelectionItem;
  dinner?: DailySelectionItem;
  total: number;
}

export type DailyTotals = DailyTotal[];

export const BoardTypes = {
  NB: "No Board",
  HB: "Half Board",
  FB: "Full Board",
} as const;

export type BoardType = keyof typeof BoardTypes;

export interface BookingState {
  initialConfig: BookingFormData | null;
  dailySelections: DailySelection[];
  step: StepType;
  dailyTotalCosts: DailyTotals;
  grandTotal: number;
}

export const StepTypes = {
  initialConfig: "initialConfig",
  dailyPlan: "dailyPlan",
  summary: "summary",
} as const;

export type StepType = keyof typeof StepTypes;
