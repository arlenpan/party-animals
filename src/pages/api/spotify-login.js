// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import joinQueryParams from '~/lib/joinQueryParams';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const endpoint = 'https://accounts.spotify.com/authorize';
const scopes = 'user-read-private user-read-email streaming';

// TODO: change from implicit grant to permanent auth w/ backend
export default function handler(req, res) {
    const params = {
        response_type: 'token',
        client_id,
        scope: scopes ? encodeURIComponent(scopes) : '',
        redirect_uri: encodeURIComponent(redirect_uri),
        state: '', // TODO: add hash here and compare to secure against x-site-forgery
        // show_dialog: true,
    };
    res.redirect(`${endpoint}?${joinQueryParams(params)}`);
}
