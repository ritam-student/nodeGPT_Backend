
import { Router } from "express";
import userRouter from "./user.routes";
import chatRouter from "./chat.routes";
import threadRouter from "./thread.routes";

const router = Router();

router.use("/user", userRouter );
router.use("/chat", chatRouter );
router.use("/thread", threadRouter );


export default router;