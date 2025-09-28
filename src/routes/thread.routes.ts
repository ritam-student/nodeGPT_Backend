import {Router} from "express";
import createThread from "../controllers/threadControllers/createThread";
import deleteThread from "../controllers/threadControllers/deleteThread";
import updateThreadTitle from "../controllers/threadControllers/updateThreadTitle";
import getAllThreads from "../controllers/threadControllers/getAllThreads";
import getChatsOfThread from "../controllers/threadControllers/getChatsOfThread";
import authUser from "../middlewares/auth";


const router = Router();

router.post("/createThread" , authUser , createThread);
router.delete("/deleteThread", authUser , deleteThread);
router.put("/updateThread", authUser , updateThreadTitle);
router.get("/getThreads/:clerkId" , authUser , getAllThreads);
router.get("/getThreadChats/:threadId" , authUser ,  getChatsOfThread);

export default router;