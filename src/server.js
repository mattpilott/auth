import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import 'dotenv/config';

const { PORT, NODE_ENV, NOW, SECRET } = process.env;
const dev = NODE_ENV === 'development';
const FileStore = sessionFileStore(session);

function logger(req, res, next) {
    console.log(`~> Received ${req.method} on ${req.url}`);
    next();
}

function protect(req, res, next) {

    const allowed = [
        '/login',
        '/reset',
        '/auth/login',
        '/auth/register',
        '/register'
    ];

    const isPrivate = !allowed.includes(req.path);
    const isFile = req.path.includes('.');
    const hasToken = req.session.token;

    if ( isPrivate && !isFile && !hasToken ) {

        res.statusCode = 302;
        res.setHeader('Location', '/login');
        res.end();
    }

    next();
}

polka()
    //.use(logger)
	.use(bodyParser.json())
	.use(session({
		secret: SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 31536000 },
        store: new FileStore({ path: NOW ? `/tmp/sessions` : `.sessions` })
	}))
    .use(protect)
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
        sapper.middleware({
            session: req => ({ user: req.session && req.session.user })
        })
	)
    .listen(PORT, err => {
		if (err) console.log('error', err);
	});