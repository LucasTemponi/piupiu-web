import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useAuth } from "../contexts/Auth";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { Link } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signingIn } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn(user, password);
  };

  return (
    <AuthFormLayout>
      <form
        onSubmit={onSubmit}
        className="flex justify-center w-96 md:w-[min(566px,100%)] gap-4 flex-col"
      >
        <h1 className="text-5xl font-bold mb-8">Rolando agora</h1>
        <h2 className="text-2xl font-bold mb-8">Junte-se aos bons</h2>
        <Input
          placeholder="Handle"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button loading={signingIn} thickness="thick">
          Login
        </Button>
        <Link className="pt-4 hover:underline mx-auto " to="/signup">
          Cadastrar
        </Link>
      </form>
    </AuthFormLayout>
  );
};
