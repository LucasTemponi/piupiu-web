import axios from "axios";
import { useState } from "react";
import { NewPiupiu } from "../components/NewPiupiu";
import { Piupiu } from "../components/Piupius";
import { Piu } from "../types/Pius";
import { MainLayout } from "../components/MainLayout";
import NavTitle from "../components/NavTitle";

export const mockAuthor = {
  handle: "LucasT",
  name: "Lucas Temponi",
  image_url:
    "https://img.freepik.com/vetores-gratis/fofo-urso-de-pelucia-acenando-a-mao-dos-desenhos-animados-icone-ilustracao_138676-2714.jpg?w=2000",
};

export const Main = () => {
  const [piupius, setPiupius] = useState<Piu[]>();
  const [textValue, setTextValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("/posts", {
        message: textValue,
      })
      .then(() => {
        setTextValue("");
        axios.get("/pius").then((res) => {
          setPiupius(res.data);
        });
      });
  };

  const handleLike = () => {
    console.log("ola");
  };

  return (
    <>
      <MainLayout>
        <NavTitle
          navOptions={[
            { title: "Para você", path: "/" },
            { title: "Seguindo", path: "/following" },
          ]}
        >
          <h2 className="text-xl font-bold px-4 py-3 ">Casa</h2>
        </NavTitle>
        <NewPiupiu
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onSubmit={handleSubmit}
          user={mockAuthor}
        />
        {piupius?.map((piupiu: Piu) => {
          return (
            <Piupiu
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
                    onClick: handleLike,
                  },
                },
              }}
              body={piupiu.message}
            />
          );
        })}
      </MainLayout>
    </>
  );
};
