const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

// App initiation
const app = express();
const PORT = process.env.PORT || 3001;

const routes = require('./controllers');
const sequalize = require('./config/connection');

const hbs = exphbs.create({});

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequalize
    })
};
app.use(session(sess));

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//turn on routes
app.use(routes);









//turn on connection to db and server
sequalize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});