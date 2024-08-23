import express from 'express';
import { createAutobots, getAutobots, getAutobotCount, getPosts, getComments } from '../controller';
import { get } from 'http';

const router = express.Router();

router.post('/create-autobots',createAutobots);

/**
 * @swagger
 * /get-all-autobots:
 *   get:
 *     summary: Get all Autobots
 *     tags: [Endpoints]
 *     responses:
 *       200:
 *         description: List of all Autobots.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *                example:
 *                 id: 1
 *                 name: Optimus Prime
 *                 username: Optimus
 *                 email: optimus@gmail.com
 *                 phone: 08012345678
 *                createdAt: 2021-08-02T14:00:00.000Z
 *                updatedAt: 2021-08-02T14:00:00.000Z
 *       500:
 *         description: Server error.
 */
router.get('/get-all-autobots',getAutobots);

/**
 * @swagger
 * /get-count:
 *   get:
 *     summary: Get total count of Autobots
 *     tags: [Endpoints]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Count of Autobots.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                count: 507
 *                recentAutobots: 10
 *       500:
 *         description: Internal Server Error.
 */
router.get('/get-count',getAutobotCount);

/**
 * @swagger
 * /get-bot-posts/{id}:
 *   get:
 *     summary: Get posts of an Autobot
 *     tags: [Endpoints]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Autobot ID
 *     responses:
 *       200:
 *         description: List of posts for a specific Autobot.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                example:
 *                id: 1
 *               title: Post Title
 *              body: Post Body
 *              AutobotId: 1
 *              createdAt: 2021-08-02T14:00:00.000Z
 *              updatedAt: 2021-08-02T14:00:00.000Z
 *       404:
 *         description: No post found, try again later.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/get-bot-posts/:id',getPosts);


/**
 * @swagger
 * /get-post-comments/{postId}:
 *   get:
 *     summary: Get comments of a post
 *     tags: [Endpoints]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: List of comments for a specific post.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *               id: 1
 *               body: Comment Body
 *               PostId: 1
 *               createdAt: 2021-08-02T14:00:00.000Z
 *               updatedAt: 2021-08-02T14:00:00.000Z
 *       404:
 *         description: No Comment found.
 *       500:
 *         description: Server error.
 */
router.get('/get-post-comments/:postId',getComments);

export default router;