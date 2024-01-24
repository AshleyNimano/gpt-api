const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const ETHERSCAN_API_KEY = 'UVV9W98IGNG6DWGTV4DDWJBUWQX6644EM9'; // Replace with your Etherscan API key

// Existing endpoint to fetch balance
app.post('/get-eth-data', async (req, res) => {
  const ethAddress = req.body.ethAddress;

  try {
    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${ethAddress}&tag=latest&apikey=${ETHERSCAN_API_KEY}`);
    
    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from Etherscan', details: error.message });
  }
});


console.log("Test")

// New endpoint to fetch beacon chain withdrawal transactions
app.post('/get-beacon-withdrawal-transactions', async (req, res) => {
  const ethAddress = req.body.ethAddress; // Extract Ethereum address from the incoming request

  const baseUrl = 'https://api.etherscan.io/api';
  const params = new URLSearchParams({
    module: 'account',
    action: 'txsBeaconWithdrawal',
    address: "0xB9D7934878B5FB9610B3fE8A5e441e8fad7E293f",
    startblock: 0,
    endblock: 99999999,
    page: 1,
    offset: 100,
    sort: 'asc',
    apikey: "UVV9W98IGNG6DWGTV4DDWJBUWQX6644EM9"
  });

  try {
    // Making a GET request to Etherscan API to fetch beacon chain withdrawal transactions
    const response = await axios.get(`${baseUrl}?${params}`);
    const data = response.data; // Extracting data from the Etherscan API response
    res.json(data); // Sending the Etherscan data back to the client
  } catch (error) {
    // Error handling: if the request to Etherscan API fails
    res.status(500).json({ message: 'Error fetching beacon withdrawal transactions', details: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
