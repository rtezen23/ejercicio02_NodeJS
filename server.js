const { app } = require('./app');

//models
const { User } = require('./models/user.model');
const { Task } = require('./models/task.model');

//utils, connection to db
const { db } = require('./utils/database.util');

db.authenticate()
    .then(() => console.log('Tasks db authenticated'))
    .catch(error => console.log(error));

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User);

db.sync()
    .then(() => console.log('Tasks db synced'))
    .catch(error => console.log(error));

app.listen(4000, () => {
    console.log('Taks app running');
});