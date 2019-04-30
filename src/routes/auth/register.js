import * as api from '../../library/api.js';
import send from '@polka/send-type';
import 'dotenv/config';

export function post(req, res) {

    const userCredentials = req.body;
    const clientCredentials = {
        grant_type: 'client_credentials',
        client_id: process.env.REGISTER_ID,
        client_secret: process.env.REGISTER_SECRET
    };

	api.post('wp/?oauth=token', clientCredentials)
        .then(token => {

            if ( token.access_token ) {

                req.session.token = token;

                api.post('wp-json/wp/v2/users', userCredentials, token.access_token)
                    .then(user => {

                		res.end(JSON.stringify(user));
                    })
                    .catch(response => {

                        res.send = send.bind(res, response.status);
                        res.end(response);
                    });
            }
        })
        .catch(response => {

            res.send = send.bind(res, response.status);
            res.end(response);
        });
}