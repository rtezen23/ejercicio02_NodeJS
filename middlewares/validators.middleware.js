//validator
const { body, validationResult } = require('express-validator');

const checkResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorArray = errors.array().map(error => error.msg);
        const message = errorArray.join(', ');

        return res.status(400).json({
            status: 'error',
            message
        });
    }

    next();
}

const createUserValidators = [
    body('name').notEmpty().withMessage('Username cannot be empty'),
    body('email').isEmail().withMessage('Must provide a valid user email'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .isAlphanumeric()
        .withMessage('Password must contain letters and numbers'),
    checkResult
];

const createTaskValidators = [
    body('title').notEmpty().withMessage('Title cannot be empty'),
    body('userId')
        .notEmpty().withMessage('userId cannot be empty')
        .isNumeric().withMessage('userId must be a number'),
    checkResult
]

module.exports = { createUserValidators, createTaskValidators };