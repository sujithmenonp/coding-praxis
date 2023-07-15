const { Sequelize, DataTypes, Model } = require('sequelize');

// Database connection configuration
const connectionString = 'postgres://postgres:mypassword@localhost:5432/postgres';

// Sequelize initialization
const sequelize = new Sequelize(connectionString);

// User model definition
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  }
);

// Function to create the user table
async function createTable() {
  try {
    await User.sync({ force: true });
    console.log('User table created successfully');
  } catch (err) {
    console.error('Error creating user table', err);
  }
}

// Database setup and table creation
async function setupDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
    await createTable();
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
}

// Call the setupDatabase function
setupDatabase();

module.exports = User;