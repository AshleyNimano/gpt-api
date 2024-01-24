const axios = require('axios');

const getBeaconChainWithdrawals = async (address, startBlock, endBlock, apiKey) => {
  const url = `https://api.etherscan.io/api?module=account&action=txsBeaconWithdrawal&address=${address}&startblock=${startBlock}&endblock=${endBlock}&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const validatorIndexes = data.result.map(item => item.validatorIndex);
    console.log('Validator Indexes Length:', validatorIndexes.length, 'Indexes:', validatorIndexes);

    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

const getAmountOfValidatedBlocks = async (address, startBlock, endBlock, apiKey) => {
  const url = `https://api.etherscan.io/api?module=account&action=getminedblocks&address=${address}&startblock=${startBlock}&endblock=${endBlock}&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const numberOfMinedBlocks = data.result.length;
    console.log('Number of Mined Blocks:', numberOfMinedBlocks);

    return numberOfMinedBlocks;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

// Usage example
const address = '0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f';
const startBlock = '0';
const endBlock = '99999999';
const apiKey = 'UVV9W98IGNG6DWGTV4DDWJBUWQX6644EM9';

getBeaconChainWithdrawals(address, startBlock, endBlock, apiKey)
  .then(data => console.log('Full Data:', data))
  .catch(error => console.error(error));

getAmountOfValidatedBlocks(address, startBlock, endBlock, apiKey)
  .then(numberOfMinedBlocks => console.log('Total Mined Blocks:', numberOfMinedBlocks))
  .catch(error => console.error(error));
