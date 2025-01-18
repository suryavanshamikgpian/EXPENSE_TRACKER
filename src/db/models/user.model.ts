import { Model,DataTypes,Optional,Sequelize } from "sequelize";
import bcrypt from 'bcryptjs'
import sequelize from "sequelize";

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Define the input attributes for creating a new User
/*
  We have to declare the AuthorCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Extend Sequelize's Model class with the User attributes and creation attributes
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
  
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    // Static methods for password hashing and comparison
    static async hashPassword(password: string): Promise<string> {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    }
  
    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
      return await bcrypt.compare(password, hashedPassword);
    }
  
    static associate(models: any): void {
      // Define associations here if needed
    }
  }

  export default (sequelize: Sequelize): typeof User => {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [6, 100], // Password should be at least 6 characters
          },
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users', // Optional: specify the table name
        timestamps: true,  // Enable createdAt and updatedAt
      }
    );
  
    return User;
  };