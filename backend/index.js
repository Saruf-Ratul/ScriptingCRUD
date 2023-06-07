// index.js
const app = require('./src/app');

const PORT = 3001; // Change it to the desired port number

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
