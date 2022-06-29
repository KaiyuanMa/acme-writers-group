const express = require("express");
const { User, Story } = require("./db");
const app = express();
const path = require("path");

app.use("/dist", express.static("dist"));
app.use("/public", express.static("assets"));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/api/users", async (req, res, next) => {
  try {
    res.send(
      await User.findAll({
        attributes: {
          exclude: ["bio"],
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/users/:id", async (req, res, next) => {
  try {
    res.send(await User.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/users/:id/stories", async (req, res, next) => {
  try {
    const stories = await Story.findAll({
      where: {
        userId: req.params.id,
      },
      order: [
        ["favorite", "DESC"],
        ["id", "ASC"],
      ],
    });
    res.send(stories);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/users", async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.params.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/users/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/users/:UserId/stories/:StoryId", async (req, res, next) => {
  try {
    const story = await Story.findByPk(req.params.StoryId);
    await story.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/users/:UserId/stories/:StoryId", async (req, res, next) => {
  try {
    await Story.update(req.body, { where: { id: req.params.StoryId } });
    console.log(req.body);
    res.sendStatus(200);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/users/:UserId/stories", async (req, res, next) => {
  try {
    res.status(201).send(await Story.create(req.params.story));
  } catch (ex) {
    next(ex);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
