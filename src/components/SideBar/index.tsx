import { BiHomeCircle } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { LuVerified } from "react-icons/lu";
import { Button } from "../Button";
import { SessionController } from "../SessionController";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
export const SideBar = () => {
  const { signOut, user } = useAuth();

  return (
    <nav className="px-2 pb-4 xl:w-64 hidden sm:flex flex-col justify-between select-none">
      <div>
        <img
          className="w-16 p-2 rounded-full mb-5 hover:bg-zinc-900"
          src="/logo.png"
        />
        <ul>
          <NavLink to="/home">
            <li className="flex mb-4 cursor-pointer p-3 rounded-full hover:bg-zinc-900 items-center gap-4">
              <BiHomeCircle className="fill-white text-2xl" />
              <span className="text-xl hidden xl:block ">Home</span>
            </li>
          </NavLink>
          <NavLink
            to={`/${user?.handle}`}
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            <li className="flex mb-4 p-3 cursor-pointer  rounded-full hover:bg-zinc-900 items-center gap-4">
              <BsPerson className="fill-white text-2xl" />
              <span className="text-xl hidden xl:block">Perfil</span>
            </li>
          </NavLink>
          <li className="flex mb-4 cursor-pointer p-3  rounded-full hover:bg-zinc-900 items-center gap-4">
            <LuVerified className="stroke-black fill-white text-2xl" />
            <span className="text-xl hidden xl:block">Verificado</span>
          </li>
        </ul>
        <div className="hidden xl:block">
          <Button thickness="thick" variant="secondary">
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
  );
};
