import ConfigSummary from "./ConfigSummary";
import DailySelectionSummary from "./DailySelectionSumarry";
import { useEffect } from "react";
import { calculateTotals } from "../../features/booking/bookingSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import TotalCost from "./TotalCost";

function Summary() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <ConfigSummary />
      <DailySelectionSummary />
      <TotalCost />
    </div>
  );
}

export default Summary;
