// code away!
const express = require('express')
const app = express()
const logger = require('./middleware/logger');
const userRouter = require('./users/userRouter');

const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(logger)

app.get('/', (req, res) => res.send('Hello World'));

app.use('/api/users', userRouter)

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
})