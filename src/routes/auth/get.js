import * as api from '../../library/api.js';
import send from '@polka/send-type';

export async function post(req, res) {

    const { url } = req.body

    try {

        const data = await api.get(url, req.session.token);

        res.end(JSON.stringify(data));
    }

    catch(response) {

        res.send = send.bind(res, response.status);
        res.end(response);
    }
}