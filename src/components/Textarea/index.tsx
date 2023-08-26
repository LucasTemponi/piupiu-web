import { ChangeEvent, DetailedHTMLProps, TextareaHTMLAttributes } from "react";

type TextAreaProps = {
  variant?: "styled" | "plain";
} & DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const textAreaStyles = (
  hasPlaceholder: boolean
): Record<Required<TextAreaProps>["variant"], string> => ({
  styled: `px-2 w-full focus:outline focus:outline-primary-100 ${
    hasPlaceholder ? "pt-5 pb-2" : "py-3"
  }`,
  plain:
    "w-full text-xl resize-none overflow-y-hidden py-2.5 px-1 caret-primary bg-transparent focus:outline-none",
});
export const Textarea = ({
  variant = "plain",
  onChange,
  ...props
}: TextAreaProps) => {
  function handleTextAreaInput(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = "";
    event.target.style.height = event.target.scrollHeight + 3.5 + "px";
    onChange?.(event);
  }

  return (
    <div className="relative w-full  group">
      {variant === "styled" && props.placeholder && (
        <label
          className={`absolute transition duration-300 pointer-events-none group-focus-within:ring-primary-100 group-focus-within:text-primary-100 group-focus-within:text-xs group-focus-within:translate-y-1 text-base ${
            props.value ? "text-xs translate-y-1" : "translate-y-4"
          } translate-x-2`}
        >
          {props.placeholder}
        </label>
      )}
      <textarea
        {...props}
        placeholder={variant === "styled" ? "" : props.placeholder}
        rows={1}
        className={textAreaStyles(!!props.placeholder)[variant]}
        onChange={handleTextAreaInput}
      />
    </div>
  );
};
