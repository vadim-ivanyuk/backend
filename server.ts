import express from "express";
import fs from "fs";
import cors from "cors";
import helmet from "helmet";
import pkg from "pg";
const { Pool } = pkg;

type User = {
  id: string;
  name: string;
  age: string;
  employment?: string;
};
const PORT = 4000;
const user: User = {
  id: "1",
  name: "Test",
  age: "18",
  employment: "Engineer",
};

const findUserById = (userId: string) => {
  return users.find(({ id }: User) => userId === id);
};

let users: User[] = [user];

const updateUser = ({ id, user }: { id: string; user: User }) => {
  users = users.map((item) => {
    if (item.id === id) {
      return { ...item, ...user };
    } else {
      return item;
    }
  });
};

const deleteUser = (id: string) => {
  return users.filter((item: User) => item.id !== id);
};

const app = express();
app.use(helmet());

const pool = new Pool({
  user: "myuser",
  host: "localhost",
  database: "mydb",
  password: "mypassword",
  port: 5433,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error("Помилка підключення до бази даних:", err);
    return;
  }

  const migrationScript = fs.readFileSync("./sql/up.sql", "utf8");

  client?.query(migrationScript, (err, result) => {
    done();

    if (err) {
      console.error("Помилка виконання міграції:", err);
    } else {
      console.log("Міграція виконана успішно.");
    }
  });
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

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
