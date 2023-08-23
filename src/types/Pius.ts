import { User } from "./Users";

export type Piu = {
  id: string;
  author: Omit<User, "desciption">;
  message: string;
  likes?: {
    total: number;
    list: User[];
  };
  replies?: {
    total: number;
    list: Piu[];
  };
  liked?: boolean;
};
