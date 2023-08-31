import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AuthFormLayout } from "../components/AuthFormLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendRoutes, routes } from "../routes";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningUp(true);
    try {
      await axios.post(backendRoutes.signup, { name, handle, password });
      navigate(routes.login);
    } catch (err) {
      console.log(err);
    }
    setSigningUp(false);
  };

  return (
    <AuthFormLayout>
      <form
        onSubmit={onSubmit}
        className="flex justify-center w-[min(384px,100%)] md:w-[min(566px,100%)] gap-4 flex-col"
      >
        <h1 className="text-5xl text-text-light dark:text-white font-bold mb-8">
          Rolando agora
        </h1>
        <h2 className="text-2xl text-text-light dark:text-white font-bold mb-8">
          Junte-se aos bons
        </h2>
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button loading={signingUp} thickness="thick">
          Cadastrar
        </Button>
      </form>
    </AuthFormLayout>
  );
};
