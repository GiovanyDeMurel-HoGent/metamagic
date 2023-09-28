require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: 'http://localhost:5173'
}

const deckRoutes = require('./routes/deckRoutes');

app.use(cors(corsOptions))
app.use('/', deckRoutes);


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})