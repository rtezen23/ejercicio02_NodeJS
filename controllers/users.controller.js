const { User } = require('../models/user.model');
const { Task } = require('../models/task.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    const newUser = await User.create({
        name,
        email,
        password
    })

    res.status(201).json({
        newUser
    });

})

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        include: Task,
        where: { status: 'active' }
    });

    res.status(200).json({ users })

})

const updateUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { name, email } = req.body;

    await user.update({ name, email })

    res.status(204).json({ status: 'sucess' })

})

const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;

    await user.update({ status: 'inactive' })
    res.status(204).json({ status: 'sucess' })
})

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
}