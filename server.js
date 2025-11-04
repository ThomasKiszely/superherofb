require('dotenv').config();
const app = require('./src/app');
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.listen(port, () => {
    console.log(`Listening on port http://${host}:${port}`);
});