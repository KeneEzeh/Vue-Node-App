import axios from 'axios';
import Autobot from '../models/autobot';
import Post from '../models/post';
import Comment from '../models/comment';
import { Request, Response } from "express";
import { Op } from 'sequelize';

export const createAutobots = async () => {
    try {
        const uniqueUsernames = new Set();
        const usedPostTitles = new Set();

        // TO AVOID MAKING MULTIPLE CALLS TO THIS ENDPOINTS, I FETCHED ALL THE DATA AT ONCE
        const [userResponse, postResponse, commentResponse] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/users'),
          axios.get('https://jsonplaceholder.typicode.com/posts'),
          axios.get('https://jsonplaceholder.typicode.com/comments')
        ]);

        const users = userResponse.data;
        const posts = postResponse.data;
        const comments = commentResponse.data;

        const autobotsData = [];
        const postsData = [];
        const commentsData = [];

        for (let i = 0; i < 500; i++) {
          let userData;
          do {
            const randomUserIndex = Math.floor(Math.random() * users.length);
            const randomUser = users[randomUserIndex];

          // SINCE THE 'https://jsonplaceholder.typicode.com/users' API ONLY RETURNS 10 USERS
          // AND THE TASK REQUIRES THE 500 AUTOBOTS(USERS) TO BE UNIQUE, I IMPLEMENTED THIS TO ENSURE
          // THAT THE AUTOBOTS HAVE UNIQUE USERNAMES AND EMAILS
            const modifiedUsername = `${randomUser.username}${Math.floor(Math.random() * 10000)}`;
            const modifiedEmail = `${randomUser.email.split('@')[0]}${Math.floor(Math.random() * 10000)}@${randomUser.email.split('@')[1]}`;
            userData = {
              name: randomUser.name,
              username: modifiedUsername,
              email: modifiedEmail,
              phone: randomUser.phone,
            };
          } while (uniqueUsernames.has(userData.username));

          uniqueUsernames.add(userData.username);

          autobotsData.push({
            name: userData.name,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
          });

          // This creates 10 new posts for the Autobot
          for (let j = 0; j < 10; j++) {
            let postTitle;
            do {
              const randomPostIndex = Math.floor(Math.random() * posts.length);
              const randomPost = posts[randomPostIndex];
              postTitle = `${randomPost.title} ${Math.floor(Math.random() * 10000)}`;
            } while (usedPostTitles.has(postTitle));

            usedPostTitles.add(postTitle);

            const newPost = {
              title: postTitle,
              body: posts[Math.floor(Math.random() * posts.length)].body,
              AutobotId: i + 1, // Placeholder for autobot ID to be set after bulk insert
            };

            postsData.push(newPost);

            // This creates 10 new comments for the post
            for (let k = 0; k < 10; k++) {
              const randomCommentIndex = Math.floor(Math.random() * comments.length);
              const randomComment = comments[randomCommentIndex];

              commentsData.push({
                body: randomComment.body,
                PostId: postsData.length, // Placeholder for post ID to be set after bulk insert
              });
            }
          }
        }

        // TO REDUCE THE TIME TAKEN TO INSERT THE DATA, I USED BULK INSERT
        const newAutobots = await Autobot.bulkCreate(autobotsData);

        postsData.forEach((post, index) => {
          post.AutobotId = newAutobots[Math.floor(index / 10)].id;
        });

        const newPosts = await Post.bulkCreate(postsData);

        commentsData.forEach((comment, index) => {
          comment.PostId = newPosts[Math.floor(index / 10)].id;
        });

        await Comment.bulkCreate(commentsData);

        console.log('Autobots created successfully');
        return;
    } catch (error) {
        console.error(error);
        return;
    }
};


export const getAutobots = async (req: Request, res: Response) => {
    try {
        const autobots = await Autobot.findAll({ limit: 10 });
        return res.json(autobots);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
        
    }
};

export const getPosts = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
        const posts = await Post.findAll({ where: { AutobotId: id }, limit: 10 });

        if (!posts) {
            return res.status(404).json({ error: 'No post has been made by this user' });
        }
        return res.json(posts);
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getComments = async (req: Request, res: Response) => {
    try {

      const { id } = req.params;
        const comments = await Comment.findAll({ where: { PostId: id }, limit: 10 });

        if (!comments) {
            return res.status(404).json({ error: 'No Comment found for this post' });
        }
        return res.status(200).json(comments);
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAutobotCount = async (req: Request, res: Response) => {
  try {
      const time = new Date();
      time.setHours(time.getHours() - 24);

      const allAutobots = await Autobot.findAll({
          attributes: ['createdAt'],
      });

      const totalCount = allAutobots.length;
      const recentAutobotsCount = allAutobots.filter(
          (autobot) => autobot.createdAt >= time
      ).length;

      return res.status(200).json({ count: totalCount, recentAutobots: recentAutobotsCount });
  } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

