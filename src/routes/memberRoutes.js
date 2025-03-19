import express from "express";
import { addMember,removeMember } from "../controllers/memberController.js";
import { protect } from "../middlewares/authMiddleware.js";


const router=express.Router();

router.post('/',protect,addMember);
router.delete('/:id',protect,removeMember);

export default router;
