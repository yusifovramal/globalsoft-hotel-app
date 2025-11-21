import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { selectStep } from "../features/booking/bookingSelectors";
import { StepTypes } from "../types/bookingTypes";
import { Check } from "lucide-react";

function ProgressBar() {
  const step = useAppSelector(selectStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4">
        {Object.entries(StepTypes).map(([key, value], idx) => {
          const stepOrder = idx + 1;
          const currentStepOrder = Object.values(StepTypes).indexOf(step) + 1;
          const isCompleted = currentStepOrder > stepOrder;
          const isActive = step === value;

          const labels = {
            initialConfig: "Configure",
            dailyPlan: "Daily Plan",
            summary: "Summary",
          };

          return (
            <React.Fragment key={value}>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white ring-4 ring-blue-200"
                      : isCompleted
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepOrder}
                </div>
                <div className="ml-2 text-sm font-medium text-gray-700">
                  {labels[key as keyof typeof labels]}
                </div>
              </div>
              {idx < Object.keys(StepTypes).length - 1 && (
                <div
                  className={`h-1 w-16 ${
                    isCompleted ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
