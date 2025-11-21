import DailyPlanTable from "./components/DailyPlan/DailyPlanTable";
import Header from "./components/Header";
import InitialConfigForm from "./components/InitialConfig/InitialConfigForm";
import ProgressBar from "./components/ProgessBar";
import Summary from "./components/Summary/Summary";
import { selectStep } from "./features/booking/bookingSelectors";
import { useAppSelector } from "./hooks/useAppSelector";
import { StepTypes } from "./types/bookingTypes";

function App() {
  const step = useAppSelector(selectStep);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />
        <ProgressBar />
        {step === StepTypes.initialConfig && <InitialConfigForm />}
        {step === StepTypes.dailyPlan && <DailyPlanTable />}
        {step === StepTypes.summary && <Summary />}
      </div>
    </div>
  );
}

export default App;
