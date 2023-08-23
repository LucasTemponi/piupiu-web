import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex py-6 flex-wrap md:flex-row flex-col select-none w-full h-[100vh] md:justify-between">
      <div className="w-full items-center md:w-1/2 md:h-full h-16 flex justify-start md:justify-center">
        <img className="ml-8 md:w-96 h-full md:h-96 w-16" src="/logo.png" />
      </div>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center ">
        <form
          onSubmit={onSubmit}
          className="flex justify-center w-96 md:w-[min(566px,100%)] gap-4 flex-col"
        >
          <h1 className="text-5xl font-bold mb-8">Rolando agora</h1>
          <h2 className="text-2xl font-bold mb-8">Junte-se aos bons</h2>
          <Input
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button thickness="thick">Login</Button>
        </form>
      </div>
    </div>
  );
};
