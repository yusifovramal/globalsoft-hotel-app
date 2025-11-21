import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  type = "button",
  onClick,
  disabled,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        " bg-blue-600 text-white py-3 rounded-lg font-medium",
        "hover:bg-blue-700 transition-colors disabled:bg-gray-400",
        className
      )}
    >
      {children}
    </button>
  );
}
