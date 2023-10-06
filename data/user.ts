import { User } from "../modules/type";

export const user: User = {
  id: "1",
  name: "Test",
  age: "18",
  employment: "Engineer",
};

export let users: User[] = [user];

export const updateUsers = ({ id, user }: { id: string; user: User }) => {
  users = users.map((item) => {
    if (item.id === id) {
      return { ...item, ...user };
    } else {
      return item;
    }
  });
};

export const deleteUser = (id: string) => {
  return users.filter((item: User) => item.id !== id);
};
