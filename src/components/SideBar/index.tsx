import { BiHomeCircle } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { LuVerified } from "react-icons/lu";
import { Button } from "../Button";
import { SessionController } from "../SessionController";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { Dialog } from "../Dialog";
import NewPiupiu from "../NewPiupiu";
import { useState } from "react";
import axios from "axios";
export const SideBar = () => {
  const { signOut, user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [addingPiupiu, setAddingPiupiu] = useState(false);
  const [textValue, setTextValue] = useState("");

  const handleSubmit = async (e: React.FormEvent, formValue?: string) => {
    e.preventDefault();
    setAddingPiupiu(true);
    axios
      .post("/posts", {
        message: formValue,
      })
      .then(() => {
        setTextValue("");
      })
      .finally(() => {
        setAddingPiupiu(false);
        setOpenDialog(false);
      });
  };

  return (
    <>
      <nav className="px-2 sticky top-0 left-0 h-screen pb-4 xl:w-64 hidden sm:flex flex-col justify-between select-none">
        <div>
          <img
            className="w-16 p-2 cursor-pointer rounded-full mb-5 hover:bg-zinc-200 dark:hover:bg-zinc-900"
            src="/logo.png"
          />
          <ul>
            <NavLink to="/home">
              <li className="flex mb-4 cursor-pointer pr-8 w-min p-3 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-900 items-center gap-4">
                <BiHomeCircle className="fill-text-light dark:fill-white text-2xl" />
                <span className="text-xl text-text-light dark:text-white hidden xl:block ">
                  Home
                </span>
              </li>
            </NavLink>
            <NavLink
              to={`/${user?.handle}`}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              <li className="flex mb-4 p-3 pr-8 w-min cursor-pointer  rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-900 items-center gap-4">
                <BsPerson className="fill-text-light dark:fill-white text-2xl" />
                <span className="text-xl text-text-light dark:text-white hidden xl:block">
                  Perfil
                </span>
              </li>
            </NavLink>
            <li className="flex mb-4 w-min pr-8 cursor-pointer p-3  rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-900 items-center gap-4">
              <LuVerified className="stroke-text-light dark:text-white dark:stroke-white text-2xl" />
              <span className="text-xl text-text-light dark:text-white hidden xl:block">
                Verificado
              </span>
            </li>
          </ul>
          <div className="hidden xl:block">
            <Button
              onClick={() => setOpenDialog(true)}
              thickness="thick"
              variant="secondary"
            >
              Piar
            </Button>
          </div>
        </div>
        {user && (
          <SessionController
            user={user}
            options={[
              {
                text: "Entrar com outra conta",
                onClick: () => {},
              },
              { text: `Sair de @${user.handle}`, onClick: signOut },
            ]}
          />
        )}
      </nav>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className="w-[min(566px,100vw)] p-1">
          {user && (
            <NewPiupiu
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              loading={addingPiupiu}
              onSubmit={handleSubmit}
              variant="borderless"
              user={user}
            />
          )}
        </div>
      </Dialog>
    </>
  );
};
