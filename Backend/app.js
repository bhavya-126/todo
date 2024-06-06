const express = require('express');
const userRoute = require('./Routes/user.route');
const taskRoute = require('./Routes/task.route');
const cors = require('cors')

const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());
app.use(express.static('Public'));

app.get('/', (req, res) => {
	res.send('todo');
	// console.log('todoList');
});

app.use('/user', userRoute);
app.use('/task', taskRoute);

app.listen(port, () => {
	console.log(`Listening at port ${port}`);
});
