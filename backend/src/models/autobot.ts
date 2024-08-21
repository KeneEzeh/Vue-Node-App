import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class Autobot extends Model {
  public id!: number;
  public name!: string;
  public username!: string;
  public email!: string;
}

Autobot.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: 'Autobot' });

export default Autobot;
