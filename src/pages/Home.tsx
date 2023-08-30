import axios from "axios";
import { useRef, useState } from "react";
import { NewPiupiu } from "../components/NewPiupiu";
import { Piu } from "../types/Pius";
import NavTitle from "../components/NavTitle";
import { useAuth } from "../contexts/Auth";
import { PiupiuList } from "../components/PiupiuList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePagination } from "../hooks/useScroll";
import { Paginated } from "../types/Paginated";
import { piuComponentHeight } from "../consts";
import { routes } from "../routes";

export const Home = () => {
  const [textValue, setTextValue] = useState("");
  const [piupius, setPiupius] = useState<Piu[] | undefined>();
  const [newData, setNewData] = useState<Piu[] | undefined>();
  const [addingPiupiu, setAddingPiupiu] = useState(false);

  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const topIsShowing = useRef(true);
  const itemsPerPage = Math.ceil(window.screen.height / piuComponentHeight);

  const { user } = useAuth();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
    refetch,
  } = useInfiniteQuery<Paginated<Piu>>({
    queryKey: ["pius"],
    queryFn: async ({ pageParam = 1 }) => {
      return axios
        .get(`/pius?page=${pageParam}&per_page=${itemsPerPage}`)
        .then((res) => res?.data);
    },
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined,
    getPreviousPageParam: (firstPage) => firstPage.currentPage - 1 || undefined,
    cacheTime: 4500,
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    structuralSharing: (oldData, incomingData) => {
      if (!oldData) {
        const dataToSave = incomingData.pages.flatMap((page) => page.data);
        setPiupius(dataToSave);
        return incomingData;
      }
      const newItems: Piu[] = [];
      const oldItems: Piu[] = [];
      incomingData.pages[0].data?.forEach((item) => {
        const itemIsOld = oldData.pages[0].data?.find(
          (piu) => piu.id === item.id
        );
        itemIsOld ? oldItems.push(item) : newItems.push(item);
      });
      if (newItems?.length !== 0 && !topIsShowing.current) {
        setNewData((incomingData) =>
          incomingData ? [...incomingData, ...newItems] : newItems
        );
        setPiupius(
          oldItems.concat(
            incomingData.pages.slice(1).flatMap((page) => page.data)
          )
        );
      } else {
        const dataToSave = incomingData.pages.flatMap((page) => page.data);
        setPiupius(dataToSave);
      }
      return incomingData;
    },
  });

  const { scrollTop } = usePagination({
    onBottomEnter: () => {
      hasNextPage && fetchNextPage();
    },
    onTopEnter: () => {
      if (newData) {
        setPiupius(data?.pages.flatMap((page) => page.data));
        setNewData(undefined);
        topIsShowing.current = true;
      }
    },
    onTopLeave: () => {
      topIsShowing.current = false;
    },
    bottomRef,
    topRef,
    refreshVariable: piupius,
  });

  const handleSubmit = async (e: React.FormEvent, formValue?: string) => {
    e.preventDefault();
    setAddingPiupiu(true);
    axios
      .post("/posts", {
        message: formValue,
      })
      .then(() => {
        setTextValue("");
        refetch();
      })
      .finally(() => {
        setAddingPiupiu(false);
      });
  };

  return (
    <div ref={topRef} className="relative">
      <NavTitle
        position="sticky"
        navOptions={[
          { title: "Para você", path: routes.home },
          { title: "Perseguindo", path: routes.following },
        ]}
        refreshButton={{
          newPosts: newData,
          onClick: () => {
            scrollTop();
          },
        }}
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
      <PiupiuList
        initialLoading={isInitialLoading}
        topRef={topRef}
        bottomRef={bottomRef}
        loading={isFetchingNextPage}
        piupius={piupius}
        onChange={refetch}
      />
    </div>
  );
};
