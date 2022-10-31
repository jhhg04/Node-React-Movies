const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes');

// Because I chose to separate client and server
app.use(
	cors({
		origin: '*'
	})
);

app.use(router);

module.exports = app;
