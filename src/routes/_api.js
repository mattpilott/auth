const base = 'https://auth.kode.site';

function query(params) {

    return Object
        .keys(params)
        .map(key => key + (params[key] ? '=' + params[key] : '' ))
        .join('&');
};

function send({ method, path, data, token, upload }) {

    const fetch = process.browser ? window.fetch : require('node-fetch').default;
	const opts = { method, headers: {} };

    if (data && upload) {
        opts.headers['Content-Type'] = data.mimetype;
        opts.headers['Content-Disposition'] = `attachment; filename=${data.name}`;
		opts.body = data;
    }

	else if (data) {
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

export function post(path, data, token, upload = false) {
	return send({ method: 'POST', path, data, token, upload });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}