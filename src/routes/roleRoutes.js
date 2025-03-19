import { get } from "mongoose";
import { createRole,getAllRoles } from "../controllers/roleController.js";
import express from 'express';

const router=express.Router();

router.post('/',createRole);
router.get('/',getAllRoles);

export default router;