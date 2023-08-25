import axios from "axios";
import { useEffect, useState } from "react";
import { NewPiupiu } from "../components/NewPiupiu";
import { Piupiu } from "../components/Piupius";
import { Piu } from "../types/Pius";
import NavTitle from "../components/NavTitle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export const Home = () => {
  const [piupius, setPiupius] = useState<Piu[]>();
  const [addingPiupiu, setAddingPiupiu] = useState(false);
  const [textValue, setTextValue] = useState("");
  const navigate = useNavigate();
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
    <>
      <NavTitle
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
      {piupius?.map((piupiu: Piu) => {
        return (
          <Piupiu
            onClick={() => navigate(`/piu/${piupiu.id}`)}
            key={piupiu.id}
            id={piupiu.id}
            author={piupiu.author}
            onChange={handleRefresh}
            reactions={{
              comment: {
                // active: piupiu.replies?.total !== 0,
                total: piupiu.replies?.total,
              },
              repiu: {
                active: false,
                total: 0,
              },
              like: {
                total: piupiu.likes?.total,
                active: piupiu.liked,
              },
            }}
            body={piupiu.message}
          />
        );
      })}
    </>
  );
};
