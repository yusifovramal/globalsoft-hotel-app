import { useAppSelector } from "../../hooks/useAppSelector";
import { selectConfig, selectDailySelections } from "../../features/booking/bookingSelectors";
import { boardTypes } from "../../data/bookingData";
import { format } from "date-fns";

function ConfigSummary() {
  const initialConfig = useAppSelector(selectConfig);
  const dailySelections = useAppSelector(selectDailySelections);

  return (
    <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Booking Configuration
      </h3>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Citizenship:</span>
          <span className="ml-2 font-medium text-gray-900">
            {initialConfig?.citizenship}
          </span>
        </div>
        <div>
          <span className="text-gray-600">Destination:</span>
          <span className="ml-2 font-medium text-gray-900">
            {initialConfig?.destination}
          </span>
        </div>
        <div>
          <span className="text-gray-600">Start Date:</span>
          <span className="ml-2 font-medium text-gray-900">
            {format(initialConfig?.startDate as string, "dd MMMM yyyy")}
          </span>
        </div>
        <div>
          <span className="text-gray-600">Duration:</span>
          <span className="ml-2 font-medium text-gray-900">
            {dailySelections.length} day{dailySelections.length > 1 ? "s" : ""}
          </span>
        </div>
        <div className="md:col-span-2">
          <span className="text-gray-600">Board Type:</span>
          <span className="ml-2 font-medium text-gray-900">
            {
              boardTypes.find((bt) => bt.code === initialConfig?.boardType)
                ?.name
            }
          </span>
        </div>
      </div>
    </div>
  );
}

export default ConfigSummary;
