import { useAppSelector } from "../../hooks/useAppSelector";
import { selectDailyTotalCosts } from "../../features/booking/bookingSelectors";
import { Check } from "lucide-react";
import { addDays, format } from "date-fns";

function DailySelectionSummary() {
  const dailyTotals = useAppSelector(selectDailyTotalCosts);
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 p-6 border-b border-gray-200">
        Daily Selections
      </h3>
      <div className="divide-y divide-gray-200">
        {dailyTotals.map(
          ({ day, startDate, total: dayTotal, hotel, lunch, dinner }, idx) => (
            <div key={day} className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold text-gray-900">
                    Day {idx + 1}
                  </div>
                  <div className="text-sm text-gray-600">
                   {format(addDays(startDate, idx), "dd MMMM yyyy")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    ${dayTotal}
                  </div>
                </div>
              </div>
              <ul className="space-y-1 text-sm text-gray-700">
                {hotel?.id && (
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    Hotel: {hotel?.name}: ${hotel?.price}
                  </li>
                )}

                {lunch?.id && (
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    Lunch: {lunch?.name}: ${lunch?.price}
                  </li>
                )}
                {dinner?.id && (
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    Dinner: {dinner?.name}: ${dinner?.price}
                  </li>
                )}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default DailySelectionSummary;
