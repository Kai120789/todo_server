const sequelize = require('../db')
const DataTypes = require('sequelize')

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

const Boards = sequelize.define('boards', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const Statuses = sequelize.define('statuses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING, allowNull: false}
})

const Tasks = sequelize.define('tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    titile: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const BoardsUsers = sequelize.define('boards_users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

Users.hasMany(Boards)
Boards.belongsTo(Users)

Users.hasMany(Tasks)
Tasks.belongsTo(Users)

Statuses.hasMany(Tasks)
Tasks.belongsTo(Statuses)

Boards.hasMany(Tasks)
Tasks.belongsTo(Boards)

Users.belongsToMany(Boards, {through: BoardsUsers})
Boards.belongsToMany(Users, {through: BoardsUsers})

const initStatuses = async () => {
    try {
      await sequelize.query(`
        INSERT INTO statuses (id, status, "createdAt", "updatedAt")
        VALUES
          (1, 'in process', NOW(), NOW()),
          (2, 'done', NOW(), NOW()),
          (3, 'archived', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `);
      console.log('Statuses initialized successfully!');
    } catch (error) {
      console.error('Error initializing statuses:', error);
    }
  };

module.exports = {
    Users,
    Boards,
    Statuses,
    Tasks,
    BoardsUsers,
    initStatuses
}