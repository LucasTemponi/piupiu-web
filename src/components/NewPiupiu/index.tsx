import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { ProfilePic } from "../ProfilePic";
import { Button } from "../Button";
import sound from "../../assets/E o pintinho piu.mp3";
import axios from "axios";
import { Textarea } from "../Textarea";

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
  const [controlledValue, setControlledValue] = useState(value);
  const [error, setError] = useState(false);
  const [foundLinks, setFoundLinks] = useState("");
  const piupiuSound = useMemo(() => new Audio(sound), []);

  const checkLink = (link: string) => {
    axios.head(link).then((res) => {
      console.log(res.headers["content-type"]);
      if (res.headers["content-type"]?.toString().includes("image")) {
        setFoundLinks(link);
      }
    });
  };
  function handleTextAreaInput(event: ChangeEvent<HTMLTextAreaElement>) {
    if (event.target.value.length >= 240) {
      setError(true);
      return;
    }
    error && setError(false);
    event.target.style.height = "";
    event.target.style.height = event.target.scrollHeight + 3.5 + "px";
    const link = event.target.value.match(/https?:\/\/(.[^\s]+)/g)?.[0];
    if (link) {
      // setFoundLinks(link);
      const newValue = event.target.value;
      console.log("No onChange: ", newValue.replace(link, ""));
      setFoundLinks(link);
      setControlledValue(newValue);
    } else {
      setControlledValue(event.target.value);
      foundLinks && setFoundLinks("");
    }

    // if (!test) setFoundLinks("");
    // setControlledValue(event.target.value);
    // onChange?.(event);
  }

  const placeholderText = useMemo(
    () =>
      placeholder || variant === "new"
        ? "O que tá pegando?!"
        : "Prove que essa pessoa está errada!",
    [placeholder, variant]
  );

  useEffect(() => {
    setControlledValue(value || "");
  }, [value]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
    piupiuSound.play();
  };

  return (
    <article className="flex border-[#2f3336] border-t-0 resize-none overflow-y-hidden select-none w-full h-min px-4 py-2 border-[1px] focus:outline-none ">
      <ProfilePic userName={user.name} image={user.image_url} />
      <form
        onSubmit={handleSubmit}
        className={`w-full px-3 flex justify-end ${
          variant === "new" ? "flex-col" : "items-center"
        }`}
      >
        <Textarea
          rows={1}
          value={controlledValue}
          onClick={() => setIsActive(true)}
          placeholder={placeholderText}
          className="w-full text-xl resize-none overflow-y-hidden py-2.5 px-1 caret-primary bg-transparent focus:outline-none"
          onChange={onChange}
        />
        <img className="max-w-full m-auto" src={foundLinks} />
        {isActive && <hr className="my-3 border-t-[1px] border-[#2f3336] " />}
        <div className="flex">
          {error && (
            <span className="text-red-500 text-sm w-50">
              Piupiu muito grande!
            </span>
          )}
          <div className="ml-auto w-28">
            <Button
              loading={loading}
              disabled={!controlledValue || error}
              type="submit"
              variant="secondary"
            >
              Piar
            </Button>
          </div>
        </div>
      </form>
    </article>
  );
};

export default NewPiupiu;
