import { InputHTMLAttributes } from "react";

type ButtonProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ placeholder, value, ...props }: ButtonProps) => {
  return (
    <div className="relative w-full  group">
      {placeholder && (
        <label
          className={`absolute text-text-light dark:text-white transition duration-300 pointer-events-none
          group-focus-within:ring-secondary-100 group-focus-within:text-secondary-100 group-focus-within:dark:ring-primary-100 group-focus-within:dark:text-primary-100 group-focus-within:text-xs group-focus-within:translate-y-1 text-base ${
            value ? "text-xs translate-y-1" : "translate-y-4"
          } translate-x-2`}
        >
          {placeholder}
        </label>
      )}
      <input
        {...props}
        value={value}
        className={`px-2 focus:border-none border border-border-light w-full focus:outline focus:outline-secondary-100 focus:dark:outline-primary-100 ${
          placeholder ? "pt-5 pb-2" : "py-3"
        }`}
      />
    </div>
  );
};

export default Input;
