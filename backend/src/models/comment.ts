import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import Post from './post';

class Comment extends Model {
  public id!: number;
  public body!: string;
  public PostId!: number;
}

Comment.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  body: { type: DataTypes.TEXT, allowNull: false },
  PostId: { type: DataTypes.INTEGER, allowNull: false },
}, { sequelize, modelName: 'Comment' });

Comment.belongsTo(Post);
Post.hasMany(Comment);

export default Comment;
