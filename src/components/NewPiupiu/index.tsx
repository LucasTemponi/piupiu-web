import { ChangeEvent, FormEvent, useState } from "react";
import { ProfilePic } from "../ProfilePic";
import { Button } from "../Button";

type NewPiupiuProps = {
  user: {
    handle: string;
    name: string;
    image_url: string;
  };
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e: FormEvent) => void;
  placeholder?: string;
  variant?: "new" | "reply";
  loading?: boolean;
};
export const NewPiupiu = ({
  user,
  value,
  placeholder,
  variant = "new",
  onChange,
  onSubmit,
  loading,
}: NewPiupiuProps) => {
  const [isActive, setIsActive] = useState(false);

  function handleTextAreaInput(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = "";
    event.target.style.height = event.target.scrollHeight + 3.5 + "px";
    onChange?.(event);
  }

  return (
    <article className="flex border-[#2f3336] border-t-0 resize-none overflow-y-hidden select-none w-full h-min px-4 py-2 border-[1px] focus:outline-none ">
      <ProfilePic userName={user.name} image={user.image_url} />
      <form
        onSubmit={onSubmit}
        className={`w-full  px-3 flex justify-end ${
          variant === "new" ? "flex-col" : "items-center"
        }`}
      >
        <textarea
          rows={1}
          value={value}
          onClick={() => setIsActive(true)}
          placeholder={placeholder || "O que tá pegando?!"}
          className="w-full text-xl resize-none overflow-y-hidden py-2.5 px-1 caret-primary bg-transparent focus:outline-none"
          onChange={handleTextAreaInput}
        />
        {isActive && <hr className="my-3 border-t-[1px] border-[#2f3336] " />}
        <div className="ml-auto w-28">
          <Button
            loading={loading}
            disabled={!value}
            type="submit"
            variant="secondary"
          >
            Piar
          </Button>
        </div>
      </form>
    </article>
  );
};

export default NewPiupiu;
