import authRouter from "./modules/auth/auth.routes.js";
import { DBConnection, syncDBConnection } from "./Database/DB.Connection.js";
import { globalErrorHandling } from "./utils/errors/error.response.js";
import userRouter from "./modules/user/user.routes.js";


export const bootstrap = async (app, express) => {
  app.use(express.json());
  await DBConnection();
  await syncDBConnection()
  app.use("/auth" , authRouter)
  app.use("/user" , userRouter)

  app.get("/", (req, res) => res.send("Hello World!"));
  app.all("*", (req, res, next) => {
    return res.status(404).json({ message: "Invalid Routing" });
  });
  app.use(globalErrorHandling)
};
