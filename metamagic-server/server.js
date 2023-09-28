require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
};
app.use(cors(corsOptions))

const deckRoutes = require('./routes/deckRoutes');


app.use('/', deckRoutes);


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})