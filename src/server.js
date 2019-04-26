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
        '/register',
        '/clients' // Added as not having this may cause sapper issues
    ];

    let isProtected = allowed.indexOf(req.url) == -1 && req.url.indexOf('.') == -1;
console.log(req.session);
    if( isProtected && !req.session.user ) {

        res.statusCode = 302;
        res.setHeader('Location', '/login');
        res.end();

        return;
    }
    next();
}

polka()
    //.use(logger)
	.use(bodyParser.json())
	.use(session({
		secret: SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 31536000 }
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