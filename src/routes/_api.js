import fetch from 'node-fetch';

const base = 'https://docs.health-and-parenting.com';

function query(params) {

    return Object
        .keys(params)
        .map(key => key + (params[key] ? '=' + params[key] : '' ))
        .join('&');
};

function send({ method, path, data, token }) {

	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		opts.body = query(data)
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`;
	}

	return fetch(`${base}/${path}`, opts)
		.then(r => r.json())
		.then(json => json);
}

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}