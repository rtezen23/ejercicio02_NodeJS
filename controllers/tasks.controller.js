const { Task } = require('../models/task.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createTask = catchAsync(async (req, res, next) => {

    const { title, userId, limitDate } = req.body;

    const task = await Task.create({
        title,
        userId,
        limitDate
    })

    res.status(201).json({
        task,
    })
})

const getAllTasks = catchAsync(async (req, res, next) => {

    const tasks = await Task.findAll();

    res.status(200).json({
        tasks
    })
})

const getTasksBystatus = catchAsync(async (req, res, next) => {

    const { status } = req.params;
    const statusArray = ['active', 'completed', 'late', 'cancelled'];
    const isStatus = statusArray.find(stat => stat === status)

    if (!isStatus) {
        return res.status(404).json({
            status: 'error',
            message: 'invalid status'
        })
    }

    const statusFiltered = await Task.findAll({ where: { status } })

    res.status(200).json({
        statusFiltered
    })
})

const updateTask = catchAsync(async (req, res, next) => {

    const { task } = req;
    const { finishDate } = req.body;

    if (task.status === 'active') {
        if (task.limitDate >= new Date(finishDate)) {
            await task.update({ status: 'completed' })
        }
        else await task.update({ status: 'late' })
        await task.update({ finishDate });
    } else {
        return res.status(400).json({
            status: 'error',
            message: 'User has no active status'
        })
    }
    res.status(204).json({ status: 'sucess' })
})

const deleteTask = catchAsync(async (req, res, next) => {

    const { task } = req;

    await task.update({ status: 'cancelled' })
    res.status(204).json({ status: 'sucess' })
})

module.exports = {
    createTask,
    getAllTasks,
    getTasksBystatus,
    updateTask,
    deleteTask
}