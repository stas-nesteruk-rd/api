import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from '../../src/db/mongoose';
import path from 'path';
import hbs from 'hbs';
import { apiRouter } from '../../src/router';
import dateFormat from 'handlebars-dateformat';
import cors from 'cors';

const MongoStore = connectMongo(session);

const app = express();
const router = express.Router();

const publicDirectoryPath = path.join(process.cwd(), '/public');
const viewsDirectoryPath = path.join(process.cwd(), '/templates/views');
const partialsDirectoryPath = path.join(process.cwd(), '/templates/partials');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const CORS_OPTION = {
    origin: process.env.ORIGIN || 'http://localhost:3000',
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true
};

app.use(
    session({
        name: 'sid',
        secret: 'keyboard cat',
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            autoRemove: 'interval',
            autoRemoveInterval: 10
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 24 hours
        },
    })
);

app.use(cors(CORS_OPTION));
app.use(cookieParser('api secret key'));
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = {
            totalCost: 0,
            totalCount: 0,
            products: []
        };
    }
    res.locals.session = req.session;
    console.log('IT\'S SERVER SIDE');
    next();
});

hbs.registerHelper('dateFormat', dateFormat);
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

app.use(express.static(publicDirectoryPath));

router.get('/session', (req, res) => {
    res.send();
});

router.get('/', (req, res) => {
    res.json({
        ApiSays: 'Greetings to you, mortal!'
    });
});

router.get('*', (req, res) => {
    res.render('error', {
        error: 'Ups, something went wrong..'
    });
});

app.use(apiRouter);
app.use(router);

export default app;
