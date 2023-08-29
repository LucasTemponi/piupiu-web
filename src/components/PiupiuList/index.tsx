import { useCallback } from "react";
import { Piu } from "../../types/Pius";
import { CircularSpinner } from "../CircularSpinner";
import Piupiu from "../Piupius";

type PiupiuList = {
  piupius?: Piu[];
  loading?: boolean;
  initialLoading?: boolean;
  onChange?: () => void;
  topRef?: React.RefObject<HTMLDivElement>;
  bottomRef?: React.RefObject<HTMLDivElement>;
};
export const PiupiuList = ({
  piupius,
  initialLoading,
  loading,
  onChange,
  bottomRef,
  topRef,
}: PiupiuList) => {
  const getRef = useCallback(
    (index: number) => {
      if (index === 0) return topRef;
      if (piupius && index === piupius?.length - 5) return bottomRef;
      return undefined;
    },
    [bottomRef, piupius, topRef]
  );

  return initialLoading ? (
    <div className="w-full flex items-center h-[50vh] justify-center">
      <CircularSpinner />
    </div>
  ) : (
    <>
      {piupius?.map((piupiu: Piu, index) => {
        return (
          <Piupiu
            ref={getRef(index)}
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
      {loading && (
        <div className="w-full h-14 flex items-center justify-center">
          <CircularSpinner />
        </div>
      )}
    </>
  );
};
