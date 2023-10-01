require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const swagger = require('./swagger-config');

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
};
app.use(bodyParser.json({ limit: '1mb' }));
app.use(cors(corsOptions), express.json())

app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));


app.use('/api-docs', swagger.serveSwaggerUI, swagger.setupSwaggerUI);

const deckRoutes = require('./routes/deckRoutes');


app.use('/', deckRoutes);


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})