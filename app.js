const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.set('view engine', 'hbs');
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} - ${req.url}}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
app.use((req, res, next) => {
    res.render('matainance.hbs');
});
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page!',
        welcomeMessage: 'Welcome to my page, fucker!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page!'
    });
});

app.get('/bad', (req, res) => {
    res.json({
        errorMessage: 'Uhh ohh. Unable to process request.'
    });
});

app.listen(8080, () => {
    console.log('Server is up and running on port 8080.')
});