import * as api from '../_api.js';
import send from '@polka/send-type';

export function post(req, res) {

    const userCredentials = req.body;
    const clientCredentials = {
        grant_type: 'client_credentials',
        client_id: 'Hpgr6cpEsV8qu8P8RJB6R0J1kwYpbjGCzbfO1cuq',
        client_secret: 'qcLY3tciwFtyMobSB6i0LGWrtjpKU3NXh50T9Stm'
    };

	api.post('/wp/?oauth=token', clientCredentials)
        .then(token => {

            if ( token.access_token ) {

                req.session.token = token;

                res.end(JSON.stringify(token));

                // api.post('/wp-json/wp/v2/users', userCredentials, token.access_token)
                //     .then(user => {
                //
                // 		res.end(JSON.stringify(user));
                //     })
                //     .catch(response => {
                //
                //         res.send = send.bind(res, response.status);
                //         res.end(response);
                //     });
            }
        })
        .catch(response => {

            res.send = send.bind(res, response.status);
            res.end(response);
        });
}