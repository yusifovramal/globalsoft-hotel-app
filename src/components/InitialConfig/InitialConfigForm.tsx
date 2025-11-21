import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  BookingFormData,
  bookingFormSchema,
} from "../../schemas/InitialConfigSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleStep, setConfig } from "../../features/booking/bookingSlice";
import { StepTypes } from "../../types/bookingTypes";
import { Calendar, MapPin, Users } from "lucide-react";
import { boardTypes, countries } from "../../data/bookingData";
import Button from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/SelectInput";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect } from "react";
import { selectConfig } from "../../features/booking/bookingSelectors";

export function InitialConfigForm() {
  const savedConfig = useAppSelector(selectConfig);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      citizenship: "",
      destination: "",
      startDate: "",
      numOfDays: 1,
      boardType: "HB",
    },
  });

  useEffect(() => {
    if (savedConfig) {
      reset(savedConfig);
    }
  }, [savedConfig, reset]);

  const onSubmit = (data: BookingFormData) => {
    dispatch(handleStep(StepTypes.dailyPlan));
    dispatch(setConfig(data));
  };
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Select
          label="Citizenship"
          icon={Users}
          error={errors.citizenship?.message}
          placeholder="Select your country"
          options={countries.map((c) => ({ value: c.name, label: c.name }))}
          {...register("citizenship")}
        />

        <Select
          label="Destination"
          icon={MapPin}
          error={errors.destination?.message}
          placeholder="Select destination"
          options={countries.map((c) => ({ value: c.name, label: c.name }))}
          {...register("destination")}
        />

        <Input
          type="date"
          label="Start Date"
          icon={Calendar}
          error={errors.startDate?.message}
          min={new Date().toISOString().split("T")[0]}
          {...register("startDate")}
        />

        <Input
          type="number"
          label="Number of Days"
          icon={Calendar}
          error={errors.numOfDays?.message}
          min={1}
          max={30}
          {...register("numOfDays", { valueAsNumber: true })}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          Board Type
        </label>
        <div className="space-y-3">
          {boardTypes.map((bt) => (
            <label
              key={bt.code}
              className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                errors.boardType
                  ? "border-red-300 hover:border-red-400"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                {...register("boardType")}
                value={bt.code}
                className="mt-1 mr-3"
              />
              <div>
                <div className="font-medium text-gray-900">{bt.name}</div>
                <div className="text-sm text-gray-600">{bt.desc}</div>
              </div>
            </label>
          ))}
        </div>

        {errors.boardType && (
          <p className="text-red-500 text-sm mt-2">
            {errors.boardType.message}
          </p>
        )}
      </div>

      <Button onClick={handleSubmit(onSubmit)} className="w-full">Continue to Daily Plan</Button>
    </div>
  );
}

export default InitialConfigForm;
