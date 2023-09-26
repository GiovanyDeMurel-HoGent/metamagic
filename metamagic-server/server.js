require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
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

const bulkOracleCardsURI = 'https://data.scryfall.io/oracle-cards/oracle-cards-20230926090140.json';
const outputFilePath = 'oracle-cards.json';

app.get('/oracle-cards-json', async (req, res) => {
  try {
    // Make an HTTP GET request to the JSON URI
    const response = await axios.get(bulkOracleCardsURI);

    // Write the JSON data to a file
    fs.writeFileSync(outputFilePath, JSON.stringify(response.data, null, 2));

    console.log('Bulk oracle cards JSON data downloaded and stored successfully.');

    res.send('Bulk oracle cards JSON data downloaded and stored successfully.');
  } catch (error) {
    console.error('Error downloading and storing Bulk oracle cards JSON data:', error.message);
    res.status(500).send('Error downloading and storing Bulk oracle cards JSON data.');
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})