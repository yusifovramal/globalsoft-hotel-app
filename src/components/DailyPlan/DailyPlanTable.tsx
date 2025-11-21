import { useAppSelector } from "../../hooks/useAppSelector";
import {
  selectConfig,
  selectDailySelections,
} from "../../features/booking/bookingSelectors";
import { StepTypes } from "../../types/bookingTypes";
import Button from "../ui/Button";
import DailyPlanForm from "./DailyPlanForm";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { handleStep } from "../../features/booking/bookingSlice";
import DailyPlanTableInfo from "./DailyPlanTableInfo";

function DailyPlanTable() {
  const initialConfig = useAppSelector(selectConfig);
  const dailySelections = useAppSelector(selectDailySelections);

  const [hotelIdError, setHotelIdError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const isHotelIdsExist = dailySelections.every((day) => day.hotelId);
    if (!isHotelIdsExist) {
      setHotelIdError("Please select a hotel for each day.");
    } else {
      dispatch(handleStep(StepTypes.summary));
    }
  };

  if (!initialConfig) return null;

  return (
    <div className="space-y-4">
      <DailyPlanTableInfo />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Hotel
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Lunch
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Dinner
              </th>
            </tr>
          </thead>
          <tbody>
            <DailyPlanForm />
          </tbody>
        </table>
      </div>
      {hotelIdError && <p className="text-red-500 text-sm">{hotelIdError}</p>}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <Button onClick={() => dispatch(handleStep(StepTypes.initialConfig))} className="w-[300px]">
          Back
        </Button>
        <Button onClick={handleClick} className="w-[300px]">
          Continue to Summary
        </Button>
      </div>
    </div>
  );
}

export default DailyPlanTable;
