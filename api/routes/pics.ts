import { Router } from "express";
import { container } from "tsyringe";
import { PicsController } from "../controller/pics";

const picsRouter = Router();

picsRouter.route("/user/:id").get(container.resolve(PicsController).getUserPic);

export default picsRouter;
