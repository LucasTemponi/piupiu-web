import { Piu } from "../../types/Pius";
import { CircularSpinner } from "../CircularSpinner";
import Piupiu from "../Piupius";

type PiupiuList = {
  piupius?: Piu[];
  loading?: boolean;
  onChange?: () => void;
};
export const PiupiuList = ({ piupius, loading, onChange }: PiupiuList) => {
  return loading ? (
    <div className="w-full flex items-center h-[50vh] justify-center">
      <CircularSpinner />
    </div>
  ) : (
    <>
      {piupius?.map((piupiu: Piu) => {
        return (
          <Piupiu
            key={piupiu.id}
            id={piupiu.id}
            author={piupiu.author}
            onChange={onChange}
            reactions={{
              comment: {
                active: false,
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
