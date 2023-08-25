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
  useEffect(() => {
    axios.get("/pius").then((res) => {
      setPiupius(res.data);
    });
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

  const handleLike = async (piupiuId: string, nextState: boolean) => {
    console.log("nextState", nextState, piupiuId);
    try {
      if (nextState) {
        await axios.post(`/posts/${piupiuId}/like`);
      } else {
        console.log("no delete");
        await axios.delete(`/posts/${piupiuId}/like`);
      }
    } catch (err) {
      console.log(err);
    }
    axios.get("/pius").then((res) => {
      setPiupius(res.data);
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
            author={piupiu.author}
            reactions={{
              reactions: {
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
                  onClick: (nextState) => handleLike(piupiu.id, nextState),
                },
              },
            }}
            body={piupiu.message}
          />
        );
      })}
    </>
  );
};
