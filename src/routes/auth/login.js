import * as api from '../_api.js';
import send from '@polka/send-type';

export function post(req, res) {

    const userCredentials = req.body;
    const clientCredentials = {
        grant_type: 'password',
        client_id: 'bRj4jQPZmbISw6J0E17tO6Bo3kVOXAtYu3COpJvo',
        client_secret: 'K2DyNVSOiB68WIjzYeteqVlwEqZw5GmjYooZpa1l'
    };

    const allCredentials = {...clientCredentials, ...userCredentials};

	api.post('/wp/?oauth=token', allCredentials)
        .then(token => {

            if ( token.access_token ) {

        		req.session.token = token;

                api.post('/wp-json/wp/v2/users/me', null, token.access_token)
                    .then(user => {

                        req.session.user = user;
                		res.end(JSON.stringify({...user, token: token.access_token}));

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