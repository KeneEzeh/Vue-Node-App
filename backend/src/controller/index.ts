import axios from 'axios';
import Autobot from '../models/autobot';
import Post from '../models/post';
import Comment from '../models/comment';
import { Request, Response } from "express";

export const createAutobots = async () => {
    try {
    
        for (let i = 0; i < 500; i++) {
          const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
          const userData = userResponse.data[i % userResponse.data.length];
          const newAutobot = await Autobot.create({
            name: userData.name,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
          });
      
          for (let j = 0; j < 10; j++) {
            const postResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const postData = postResponse.data[j % postResponse.data.length];
            const newPost = await Post.create({
              title: `${postData.title} - ${i}-${j}`,
              body: postData.body,
              AutobotId: newAutobot.id,
            });
      
            for (let k = 0; k < 10; k++) {
              const commentResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
              const commentData = commentResponse.data[k % commentResponse.data.length];
              await Comment.create({
                body: commentData.body,
                PostId: newPost.id,
              });
            }
          }
        }
    } catch (error) {
        console.error(error);
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
        const posts = await Post.findAll({ where: { AutobotId: req.params.id }, limit: 10 });
        return res.json(posts);
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getComments = async (req: Request, res: Response) => {
    try {

        const comments = await Comment.findAll({ where: { PostId: req.params.id }, limit: 10 });
        return res.json(comments);
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
