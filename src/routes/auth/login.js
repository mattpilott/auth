import * as api from '../../library/api.js';
import send from '@polka/send-type';
import 'dotenv/config';

export async function post(req, res) {

    const credentials = {
        grant_type: 'password',
        client_id: process.env.LOGIN_ID,
        client_secret: process.env.LOGIN_SECRET,
        ...req.body
    };

    try {
        const token = await api.post('wp/?oauth=token', credentials);
        const user = await api.post('wp-json/wp/v2/users/me', null, token.access_token);

        req.session.token = token.access_token;
        
        res.end(JSON.stringify(user));
    }

    catch(response) {
        res.send = send.bind(res, response.status);
        res.end(response);
    }
}