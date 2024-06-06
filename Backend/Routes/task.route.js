const express = require('express');

const authenticated = require('../Controllers/authenticated');
const getTasksController = require('../Controllers/getTasks.controller');

const { newTask, updateTask } = require('../Schema/task.schema');
const validate = require('../Controllers/validate');
const addTaskController = require('../Controllers/addTask.controller');
const deleteTaskController = require('../Controllers/deleteTask.controller');
const updateTaskController = require('../Controllers/updateTask.controller');

const router = express.Router();

router.get('/', authenticated, getTasksController);

router.post('/', authenticated, validate(newTask), addTaskController);

router.delete('/:id', authenticated, deleteTaskController);

router.put('/:id', authenticated, validate(updateTask), updateTaskController);

module.exports = router;
