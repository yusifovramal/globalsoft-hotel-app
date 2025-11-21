import { DollarSign } from "lucide-react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectGrandTotal } from "../../features/booking/bookingSelectors";

function TotalCost() {
    const grandTotal = useAppSelector(selectGrandTotal) 
  return (
    <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <DollarSign className="w-8 h-8 text-green-700 mr-3" />
          <div>
            <div className="text-sm text-gray-600">Total Booking Cost</div>
            <div className="text-3xl font-bold text-gray-900">${grandTotal}</div>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Print Summary
        </button>
      </div>
    </div>
  );
}

export default TotalCost