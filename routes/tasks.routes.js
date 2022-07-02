const express = require('express');

//controller methods
const {
    createTask,
    getAllTasks,
    getTasksBystatus,
    updateTask,
    deleteTask
} = require('../controllers/tasks.controller');

//middlewares - validator
const { createTaskValidators } = require('../middlewares/validators.middleware');
const { taskExists } = require('../middlewares/tasks.middleware');


const tasksRouter = express.Router();

tasksRouter.post('/', createTaskValidators, createTask);
tasksRouter.get('/', getAllTasks);
tasksRouter.get('/:status', getTasksBystatus);
tasksRouter.patch('/:id', taskExists, updateTask);
tasksRouter.delete('/:id', taskExists, deleteTask);

module.exports = { tasksRouter };