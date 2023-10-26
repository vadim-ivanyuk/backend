import { users } from "../data/user";
import { User } from "../modules/type";

export const findUserById = (userId: string) => {
  return users.find(({ id }: User) => userId === id);
};
