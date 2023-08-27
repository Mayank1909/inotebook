const connnectToMongo = require('./db');
connnectToMongo();

const express = require('express')
const app = express()
const port = 5000

app.use(express.json());
// AVAILABLE ROUTES
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`iNotebook backend listening at port ${port}`)
})