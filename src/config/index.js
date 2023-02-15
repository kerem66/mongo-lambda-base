const dotenv = require('dotenv');

const envFound = dotenv.config();

if (envFound.error) {
    throw new Error('Could not find .env file');
}

exports.config = {
    databaseURL: process.env.MONGO_URI
};
