import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  icon?: React.ComponentType<{ className?: string }>;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      icon: Icon,
      error,
      helperText,
      options,
      placeholder = "Select an option",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            {label}
          </label>
        )}

        <select
          ref={ref}
          className={`w-full px-4 py-2 border rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-colors outline-none
            bg-white
            ${error ? "border-red-500" : "border-gray-300"}
            disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed
            ${className}`}
          {...props}
        >
          <option value="" disabled className="text-gray-400">
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-gray-500 text-sm mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
