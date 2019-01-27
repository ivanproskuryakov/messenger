const params = require('./development.json');

console.log('HOST --->', params.API_HOST);
console.log('ENV --->', process.env.NODE_ENV);

export default params;
