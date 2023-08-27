import axios from "axios";
import { useEffect, useState } from "react";
import { NewPiupiu } from "../components/NewPiupiu";
import { Piu } from "../types/Pius";
import NavTitle from "../components/NavTitle";
import { useAuth } from "../contexts/Auth";
import { PiupiuList } from "../components/PiupiuList";

export const Home = () => {
  const [piupius, setPiupius] = useState<Piu[]>();
  const [addingPiupiu, setAddingPiupiu] = useState(false);
  const [textValue, setTextValue] = useState("");
  const { user } = useAuth();

  const handleRefresh = () => {
    axios.get("/pius").then((res) => {
      setPiupius(res.data);
    });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    setAddingPiupiu(true);
    e.preventDefault();
    axios
      .post("/posts", {
        message: textValue,
      })
      .then(() => {
        setTextValue("");
        axios.get("/pius").then((res) => {
          setPiupius(res.data);
          setAddingPiupiu(false);
        });
      });
  };

  return (
    <div className="relative">
      <NavTitle
        position="sticky"
        navOptions={[
          { title: "Para você", path: "/home" },
          { title: "Seguindo", path: "/following" },
        ]}
      >
        <h2 className="text-xl font-bold px-4 py-3 ">Casa</h2>
      </NavTitle>
      {user && (
        <NewPiupiu
          loading={addingPiupiu}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onSubmit={handleSubmit}
          user={user}
        />
      )}
      <PiupiuList piupius={piupius} onChange={handleRefresh} />
    </div>
  );
};
