import { app } from "./index";

import { deleteUser, updateUser, users } from "./data/user";
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

    throw new Error("Bad request. User not found");
  } catch (error) {
    next(error);
  }
});

app.post("/users", (req, res, next) => {
  try {
    if (req.body.hasOwnProperty("age") && req.body.hasOwnProperty("name")) {
      const newUser = {
        id: String(users.length + 1),
        ...(req.body as { name: string; age: string }),
      };

      users.push(newUser);
      res.status(201).json(users);

      return;
    }

    throw new Error("Bad request. Fields age and name is required");
  } catch (error) {
    next(error);
  }
});

app.patch("/users/:userId", (req, res, next) => {
  try {
    if (Object.keys(req.body).length) {
      updateUser({ id: req.params.userId, user: req.body as User });
      res.status(200).json(users);

      return;
    }

    throw new Error("Bad request. Body is required");
  } catch (error) {
    next(error);
  }
});

app.delete("/users/:userId", (req, res, next) => {
  try {
    if (req.params.userId) {
      deleteUser(req.params.userId);
      res.status(200).json(users);

      return;
    }

    throw new Error("Bad request. User not found");
  } catch (error) {
    next(error);
  }
});

app.put("/users/:userId", (req, res, next) => {
  try {
    if (Object.keys(req.body).length) {
      updateUser({ id: req.params.userId, user: req.body as User });
      res.status(200).json(users);

      return;
    }

    throw new Error("Bad request. Body is required");
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
