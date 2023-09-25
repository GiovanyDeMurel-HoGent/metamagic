require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT

const corsOptions = {
  origin: 'http://localhost:5173'
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    try{
        res.status(200).send("Hello World!")
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})