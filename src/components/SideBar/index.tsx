import { BiHomeCircle } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { LuVerified } from "react-icons/lu";
import { Button } from "../Button";
import { mockAuthor } from "../../pages/Main";
import { SessionController } from "../SessionController";
export const SideBar = () => (
  <nav className="px-2 pb-4 xl:w-64 hidden sm:flex flex-col justify-between select-none">
    <div>
      <img
        className="w-16 p-2 rounded-full mb-5 hover:bg-zinc-900"
        src="/logo.png"
      />
      <ul>
        <li className="flex mb-4 cursor-pointer p-3 rounded-full hover:bg-zinc-900 items-center gap-4">
          <BiHomeCircle className="fill-white text-2xl" />
          <span className="text-xl hidden xl:block ">Home</span>
        </li>
        <li className="flex mb-4 p-3 cursor-pointer  rounded-full hover:bg-zinc-900 items-center gap-4">
          <BsPerson className="fill-white text-2xl" />
          <span className="text-xl hidden xl:block">Perfil</span>
        </li>
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
    <SessionController
      user={mockAuthor}
      options={[
        {
          text: "Entrar com outra conta",
          onClick: () => {},
        },
        { text: `Sair de @${mockAuthor.handle}`, onClick: () => {} },
      ]}
    />
  </nav>
);
