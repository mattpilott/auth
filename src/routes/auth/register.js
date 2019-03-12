import * as api from '../_api.js';
import send from '@polka/send-type';

export function post(req, res) {

    const userCredentials = req.body;
    const clientCredentials = {
        grant_type: 'client_credentials',
        client_id: 'bRj4jQPZmbISw6J0E17tO6Bo3kVOXAtYu3COpJvo',
        client_secret: 'K2DyNVSOiB68WIjzYeteqVlwEqZw5GmjYooZpa1l'
    };

	api.post('/wp/?oauth=token', clientCredentials)
        .then(token => {

            if ( token.access_token ) {

                req.session.token = token;

                api.post('/wp-json/wp/v2/media', req.files.avatar, token.access_token, true)
                    .then(media => {
                        
                		res.end(JSON.stringify(media));
                    })
                    .catch(response => {

                        res.send = send.bind(res, response.status);
                        res.end(response);
                    });

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