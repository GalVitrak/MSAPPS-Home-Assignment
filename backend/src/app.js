import express from "express";
import cors from "cors";
import appConfig from "./Utils/app-config.js";
import imageController from "./Controllers/image-controller.js";
import catchAll from "./Middleware/catch-all.js";
import logRequest from "./Middleware/log-request.js";
import path from "path";

const __filename = import.meta.url.substring(
  import.meta.url.lastIndexOf("/") + 1,
  import.meta.url.length
);
const __dirname = path.dirname(__filename);

const server = express();

server.use(cors());
server.use(express.json());
server.use(logRequest);
server.use("/api", imageController);
server.use(express.static(path.join(__dirname, "_front-end")));
server.use(catchAll);

server.listen(appConfig.port, () =>
  console.log(`Listening on port ${appConfig.port}`)
);
