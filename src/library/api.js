const base = 'https://auth.kode.site';

function query(params) {

    return Object
        .keys(params)
        .map(key => key + (params[key] ? '=' + params[key] : '' ))
        .join('&');
};

async function send({ method, path, data, token }) {

    const fetch = process.browser ? window.fetch : require('node-fetch').default;
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		opts.body = query(data)
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`;
	}

    const req = await fetch(`${base}/${path}`, opts);
    const res = await req.text();

    try {
        return JSON.parse(res);
    }

    catch(e) {
        return req;
    }
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