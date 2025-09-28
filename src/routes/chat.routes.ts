
import {Router} from "express";
import createChat from "../controllers/chatControllers/createChat";
import authUser from "../middlewares/auth";
import chatResponse from "../controllers/chatControllers/chatResponse";


const router = Router();


router.post("/createChat" , authUser , createChat);
router.post("/chatResponse" , chatResponse);


export default router;