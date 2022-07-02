//express
const express = require('express');

//routers
const { tasksRouter } = require('./routes/tasks.routes')
const { usersRouter } = require('./routes/users.routes')

// Global error controller
const { globalErrorHandler } = require('./controllers/error.controller');

//App Error
const { AppError } = require('./utils/appError.util');

//init express app
const app = express();

//using json's
app.use(express.json());

//using routers with endpoints
app.use('/api/v1/tasks', tasksRouter);
app.use('/api/v1/users', usersRouter);

// Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
    next(
        new AppError(
            `${req.method} ${req.originalUrl} not found in this server`, 404
        )
    );
});

// Global error handler method
app.use(globalErrorHandler);

module.exports = { app };