import { addDays, format } from "date-fns";
import { hotels, meals } from "../../data/bookingData";
import {
  selectBoardType,
  selectDailySelections,
  selectDestination,
} from "../../features/booking/bookingSelectors";
import {
  deleteDaySelection,
  handleStep,
  setDaySelection,
} from "../../features/booking/bookingSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { BoardType, StepTypes } from "../../types/bookingTypes";
import { Select } from "../ui/SelectInput";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";

function DailyPlanForm() {
  const dailySelections = useAppSelector(selectDailySelections);
  const destination = useAppSelector(selectDestination);
  const boardType = useAppSelector(selectBoardType) as BoardType;

  const dispatch = useAppDispatch();
  const destinationHotels = hotels[destination as keyof typeof hotels];
  const mealOptions = meals[destination as keyof typeof meals];

  useEffect(() => {
    if (dailySelections.length === 0) {
      dispatch(handleStep(StepTypes.initialConfig));
    }
  }, [dailySelections.length, dispatch]);

  return (
    <>
      {dailySelections?.map((selectedDay, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
            Day {selectedDay.day}
            <div className="text-xs text-gray-600">
              {format(addDays(selectedDay?.startDate, idx), "dd MMMM yyyy")}
            </div>
          </td>
          <td className="border border-gray-300 px-4 py-3">
            <Select
              required
              onChange={(e) =>
                dispatch(
                  setDaySelection({
                    day: selectedDay.day,
                    hotelId: Number(e.target.value),
                  })
                )
              }
              value={selectedDay.hotelId || ""}
              placeholder="Select your country"
              options={destinationHotels.map((h) => ({
                value: h.id.toString(),
                label: `${h.name} - ($${h.price})`,
              }))}
            />
          </td>
          <td className="border border-gray-300 px-4 py-3">
            <Select
              disabled={
                boardType === "NB" ||
                (boardType === "HB" && !!selectedDay.dinnerId)
              }
              onChange={(e) =>
                dispatch(
                  setDaySelection({
                    day: selectedDay.day,
                    lunchId: Number(e.target.value),
                  })
                )
              }
              value={selectedDay.lunchId ?? ""}
              options={[
                { value: "", label: "None" },
                ...mealOptions.lunch.map((m) => ({
                  value: m.id.toString(),
                  label: `${m.name} - ($${m.price})`,
                })),
              ]}
            />
          </td>
          <td className="border border-gray-300 px-4 py-3">
            <Select
              disabled={
                boardType === "NB" ||
                (boardType === "HB" && !!selectedDay.lunchId)
              }
              onChange={(e) =>
                dispatch(
                  setDaySelection({
                    day: selectedDay.day,
                    dinnerId: Number(e.target.value),
                  })
                )
              }
              value={selectedDay.dinnerId ?? ""}
              options={[
                { value: "", label: "None" },
                ...mealOptions.dinner.map((m) => ({
                  value: m.id.toString(),
                  label: `${m.name} - ($${m.price})`,
                })),
              ]}
            />
          </td>
          <td>
            <button
              title="Delete this day"
              onClick={() => dispatch(deleteDaySelection(selectedDay.day))}
              className="
      p-2 rounded-full 
      hover:bg-red-100 
      text-red-600 
      hover:text-red-700 
      transition
      inline-flex items-center justify-center
    "
            >
              <Trash2 size={18} />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default DailyPlanForm;
