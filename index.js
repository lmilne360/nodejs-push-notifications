const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json())
const publicVapidKey = 'BF94IsDzQAlsR50YSmz3q59h_rKTSHyJjP7nfly6oFJIzWWiIk5UDbzRehnlxpygz-oyMt-mkhpYGVWuo1uxud8';
const privateVapidKey = 'yq90_9ZhmcZnySgufoRX25M8vb8GxmFjOf3TkvaPeQk';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);


// Subscribe Route
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload =  JSON.stringify({title: 'Push test'});

    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));