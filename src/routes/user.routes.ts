
import { Router } from "express";
import createUser from "../controllers/userControllers/createUser";
import getUser from "../controllers/userControllers/getUser";

const router = Router();


router.post("/createUser" , createUser);
router.get("/:clerkId" , getUser);


export default router;