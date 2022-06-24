import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
  id: number;
  email?: string;
  phoneNumber?: number;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {
  [x: string]: any;
}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export function Users(sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}
