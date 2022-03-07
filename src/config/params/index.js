const env = process.env.NODE_ENV;
const params = require(`./${env}.json`); // eslint-disable-line import/no-dynamic-require

console.log('HOST --->', params.API_HOST);
console.log('ENV --->', env);

export default params;
