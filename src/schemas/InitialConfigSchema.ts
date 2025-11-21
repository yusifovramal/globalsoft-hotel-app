import z from "zod";

export const bookingFormSchema = z.object({
  citizenship: z.string().min(1, "Please select your citizenship"),
  destination: z.string().min(1, "Please select a destination"),
  startDate: z.string().min(1, "Please select a start date"),
  numOfDays: z.number()
    .min(1, "Minimum 1 day required")
    .max(30, "Maximum 30 days allowed"),
  boardType: z.enum(["NB", "HB", "FB"]),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
