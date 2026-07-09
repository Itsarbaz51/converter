import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.get("/", (req, res) => {
    res.send("Hello, Server!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

export default app;