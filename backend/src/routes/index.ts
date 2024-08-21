import express from 'express';
import { getAutobots, getPosts, getComments } from '../controller';
import { get } from 'http';

const router = express.Router();

router.get('/get-all-autobots',getAutobots);

router.get('/get-autobot/:id',getPosts);

router.get('/get-post/:id',getComments);

export default router;