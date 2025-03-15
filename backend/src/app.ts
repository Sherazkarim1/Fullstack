import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*", // Allow any origin
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Authorization",
      "Accept",
      "Origin",
      "DNT",
      "X-CustomHeader",
      "Keep-Alive",
      "User-Agent",
      "X-Requested-With",
      "If-Modified-Since",
      "Cache-Control",
      "Content-Type",
      "Content-Range",
      "Range",
    ],
    credentials: true,
  })
);
app.use(express.json());

const messages: { [key: number]: string } = {
  1: "Hello, World!",
  2: "Bye, World!",
};

app.post("/sendMessage", (req: Request, res: Response): void => {
  try {
    const id = Object.keys(messages).length + 1;
    const content = req.body.content;

    if (!content) {
      res.status(400).send({ error: "Content is required" });
    }

    messages[id] = content;
    res.send({ message: "Message sent", id: id, content: messages[id] });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while sending the message." });
  }
});

app.get("/", (req, res) => {
  res.send(messages);
});

export default app;
