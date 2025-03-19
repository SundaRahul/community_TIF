import express from 'express';

import {
    createCommunity,
    getAllCommunities,
    getAllMembers,
    getMyOwnedCommunities,
    getMyJoinedCommunities
} from '../controllers/communityController.js';

import {protect} from '../middlewares/authMiddleware.js';

const router =express.Router();

router.post('/',protect,createCommunity);
router.get('/',protect,getAllCommunities);
router.get('/:id/members',protect,getAllMembers);
router.get('/me/owner',protect,getMyOwnedCommunities);
router.get('/me/member',protect,getMyJoinedCommunities);

export default router;
