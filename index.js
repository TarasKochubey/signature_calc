const crypto = require('crypto');

/**
 * Calculates the signature using the provided secret key and input data.
 * @param {string} secretKey - The secret key.
 * @param {Object} inputData - The input data as an object.
 * @returns {string} - The calculated signature.
 */
function calculateSignature(secretKey, inputData) {
  // Sorting input data alphabetically
  const sortedData = Object.keys(inputData).sort().reduce((accumulator, key) => {
    accumulator[key] = inputData[key];
    return accumulator;
  }, {});

  // Constructing the parameter string
  const paramString = Object.keys(sortedData).map(key => `${key}=${sortedData[key]}`).join('|');

  // Adding the secret key to the parameter string
  const stringToSign = paramString + '|' + secretKey;

  // Converting the string to lowercase
  const stringToSignLow = stringToSign.toLowerCase();

  // Calculating the hash (SHA256)
  const signature = crypto.createHash('sha256').update(stringToSignLow).digest('hex');

  return signature;
}

module.exports = {
  calculateSignature
};