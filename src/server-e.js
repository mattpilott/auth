import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '../__sapper__/server.js';

import bodyParser from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { Store } from 'svelte/store.js';

const { PORT, NODE_ENV, NOW } = process.env;
const dev = NODE_ENV === 'development';

const FileStore = sessionFileStore(session);

// Log every request
function logger(req, res, next) {
    console.log(`~> Received ${req.method} on ${req.url}`);
    next(); // move on
}

function protect(req, res, next) {

    let allowed = [
        '/login',
        '/auth/login',
        '/auth/register',
        '/register'
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
    //.use(logger)
	.use(bodyParser.json())
	.use(session({
		secret: 'topsecret',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 31536000
		},
		store: new FileStore({
			path: NOW ? `/tmp/sessions` : `.sessions`
		})
	}))
    .use(protect)
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			store: req => {
				return new Store({
					user: req.session && req.session.user
				});
			}
		})
	)
    .listen(PORT, err => {
		if (err) console.log('error', err);
	});