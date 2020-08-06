// import errorHandler from 'errorhandler';
import cors from "cors";
import log from "./utils/logger";
import app from "./app";

export function server(port: number, pathToApp: string): void {
  app.use(cors());

  app.listen(port, () => log(`server running at http://localhost:${port}`));
}
