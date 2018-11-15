import express from 'express';
import compression from 'compression';
import serve from 'serve-static';
import bodyParser from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import * as sapper from '../__sapper__/server.js';
import { Store } from 'svelte/store.js';

const FileStore = sessionFileStore(session);

// Log every request
function logger(req, res, next) {
    console.log(`~> Received ${req.method} on ${req.url}`);
    next(); // move on
}

function protect(req, res, next) {

    let allowed = [
        '/login',
        '/auth/login'
    ];

    let isProtected = allowed.indexOf(req.url) == -1 && req.url.indexOf('.') == -1;

    if( isProtected ) {

        if( ! req.session.user ) {

            res.statusCode = 302;
            res.setHeader('Location', '/login');
            res.end();

            return;
        }
    }

    next();
}

express()
	.use(bodyParser.json())
    //.use(logger)
	.use(session({
		secret: 'topsecret',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 31536000
		},
		store: new FileStore({
			path: process.env.NOW ? `/tmp/sessions` : `.sessions`
		})
	}))
    .use(protect)
	.use(
		compression({ threshold: 0 }),
		serve('static'),
		sapper.middleware({
			store: req => {
				return new Store({
					user: req.session && req.session.user
				});
			}
		})
	)
	.listen(process.env.PORT);