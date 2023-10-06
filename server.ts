import { app } from "./index";

import { deleteUser, updateUsers, users } from "./data/user";
import { PORT } from "./constants";
import { findUserById } from "./utils/user";
import { User } from "./modules/type";

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Running Node with Express and Typescript",
  });
});

app.get("/users", (req, res, next) => {
  res.status(200).json(users);
});

app.get("/users/:userId", (req: { params: { userId: string } }, res, next) => {
  try {
    const user = findUserById(req.params.userId);

    if (user) {
      res.status(200).json(user);

      return;
    }

    throw new Error("User not found");
  } catch (error) {
    next(error);
  }
});

app.post("/create-user", (req, res, next) => {
  try {
    if (req.query.hasOwnProperty("age") && req.query.hasOwnProperty("name")) {
      const newUser = {
        id: String(users.length + 1),
        ...(req.query as { name: string; age: string }),
      };

      users.push(newUser);
      res.status(201).json(users);

      return;
    }

    throw new Error("Bad request.");
  } catch (error) {
    next(error);
  }
});

app.patch("/update-user/:userId", (req, res, next) => {
  try {
    if (Object.keys(req.query).length) {
      updateUsers({ id: req.params.userId, user: req.query as User });
      res.status(200).json(users);

      return;
    }

    throw new Error("Bad request.");
  } catch (error) {
    next(error);
  }
});

app.delete("/delete-user/:userId", (req, res, next) => {
  try {
    if (req.params.userId) {
      deleteUser(req.params.userId);
      res.status(200).json(users);

      return;
    }

    throw new Error("Bad request.");
  } catch (error) {
    next(error);
  }
});

app.put("/update-user/:userId", (req, res, next) => {
  try {
    if (Object.keys(req.query).length) {
      updateUsers({ id: req.params.userId, user: req.query as User });
      res.status(200).json(users);

      return;
    }

    throw new Error("Bad request.");
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
