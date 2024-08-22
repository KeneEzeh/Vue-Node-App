import axios from 'axios';
import Autobot from '../models/autobot';
import Post from '../models/post';
import Comment from '../models/comment';
import { Request, Response } from "express";

export const createAutobots = async () => {
    try {
    
        // for (let i = 0; i < 500; i++) {
        //   const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users');

        //   if (!userResponse.data) {
        //     return;
        //   }
        //   const userData = userResponse.data[i % userResponse.data.length];
        //   const newAutobot = await Autobot.create({
        //     name: userData.name,
        //     username: userData.username,
        //     email: userData.email,
        //     phone: userData.phone,
        //   });
      
        //   for (let j = 0; j < 10; j++) {
        //     const postResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
        //     const postData = postResponse.data[j % postResponse.data.length];
        //     const newPost = await Post.create({
        //       title: `${postData.title} - ${i}-${j}`,
        //       body: postData.body,
        //       AutobotId: newAutobot.id,
        //     });
      
        //     for (let k = 0; k < 10; k++) {
        //       const commentResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
        //       const commentData = commentResponse.data[k % commentResponse.data.length];
        //       await Comment.create({
        //         body: commentData.body,
        //         PostId: newPost.id,
        //       });
        //     }
        //   }
        // }
        const uniqueUsernames = new Set();
        const uniquePostTitles = new Set();

        for (let i = 0; i < 500; i++) {
          let userData;
          do {
            const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
            const randomUserIndex = Math.floor(Math.random() * userResponse.data.length);
            const randomUser = userResponse.data[randomUserIndex];

            // SINCE THE 'https://jsonplaceholder.typicode.com/users' API ONLY RETURNS 10 USERS
            // AND THE TASK REQUIRES THE 500 AUTOBOTS(USERS) TO BE UNIQUE, I IMPLEMENTED THIS TO ENSURE
            // THAT THE AUTOBOTS HAVE UNIQUE USERNAMES AND EMAILS
            
            const modifiedUsername = `${randomUser.username}${Math.floor(Math.random() * 100)}`;
            const modifiedEmail = `${randomUser.email.split('@')[0]}${Math.floor(Math.random() * 100)}@${randomUser.email.split('@')[1]}`;
            userData = {
              name: randomUser.name,
              username: modifiedUsername,
              email: modifiedEmail,
              phone: randomUser.phone,
            };
          } while (uniqueUsernames.has(userData.username));

          uniqueUsernames.add(userData.username);

          const newAutobot = await Autobot.create({
            name: userData.name,
            username: userData.username,
            email: userData.email,
            phone: userData.phone
          });

          // This creates 10 new posts for the Autobot
          // for (let j = 0; j < 10; j++) {
          //   let postDetails;
          //   do {
          //     const postResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
          //     const randomPostIndex = Math.floor(Math.random() * postResponse.data.length);
          //     postDetails = {
          //       title: postResponse.data[randomPostIndex].title,
          //       body: postResponse.data[randomPostIndex].body,
          //       AutobotId: newAutobot.id,
          //     }

          //   } while (uniquePostTitles.has(postDetails.title));

          //   uniquePostTitles.add(postDetails.title);

          //   const newPost = await Post.create(postDetails);

          //   // This creates 10 new comments for the post
          //   for (let k = 0; k < 10; k++) {
          //     const commentResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
          //     const randomCommentIndex = Math.floor(Math.random() * commentResponse.data.length);
          //     const randomComment = commentResponse.data[randomCommentIndex];

          //     await Comment.create({
          //       body: randomComment.body,
          //       PostId: newPost.id,
          //     });
          //   }
          // }
        }
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
        const posts = await Post.findAll({ where: { AutobotId: req.params.id }, limit: 10 });

        if (!posts) {
            return res.status(404).json({ error: 'Posts not found' });
        }
        return res.json(posts);
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getComments = async (req: Request, res: Response) => {
    try {

        const comments = await Comment.findAll({ where: { PostId: req.params.id }, limit: 10 });

        if (!comments) {
            return res.status(404).json({ error: 'No Comment found' });
        }
        return res.json(comments);
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAutobotCount = async (req: Request, res: Response) => {
    try {
        const count = await Autobot.count();
        return res.json({ count });
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
