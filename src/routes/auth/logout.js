import * as api from '../../library/api.js';

export function post(req, res) {

	delete req.session.token;

	res.end(JSON.stringify({ ok: true }));
}