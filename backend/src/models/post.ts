// src/models/Post.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import Autobot from './autobot';

class Post extends Model {
  public id!: number;
  public title!: string;
  public body!: string;
  public AutobotId!: number;
}

Post.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false },
  AutobotId: { type: DataTypes.INTEGER, allowNull: false },
}, { sequelize, modelName: 'Post' });

Post.belongsTo(Autobot);
Autobot.hasMany(Post);

export default Post;
