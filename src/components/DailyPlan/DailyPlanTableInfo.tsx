import { AlertCircle } from "lucide-react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectBoardType } from "../../features/booking/bookingSelectors";
import { BoardType, BoardTypes } from "../../types/bookingTypes";


function DailyPlanTableInfo() {
  const boardType = useAppSelector(selectBoardType) as BoardType ;
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
        <div className="text-sm text-blue-800">
          <strong>Board Type: {BoardTypes[boardType]}</strong>
          <p className="mt-1">
            {boardType === "FB" &&
              "You can select both lunch and dinner for each day."}
            {boardType === "HB" &&
              "You can select either lunch OR dinner for each day (not both)."}
            {boardType === "NB" && "No meals can be selected."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DailyPlanTableInfo;