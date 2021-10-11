import appFetch from './fetch';

export const play = ({ accessToken, deviceId, uri }) => {
    console.log('PLAYING', uri);
    return appFetch('https://api.spotify.com/v1/me/player/play', {
        query: { device_id: deviceId },
        method: 'PUT',
        body: { uris: [uri] },
        accessToken,
    });
};

export const searchSongs = ({ accessToken, query }) => {
    return appFetch('https://api.spotify.com/v1/search', {
        query: { q: encodeURIComponent(query), type: 'track' },
        accessToken,
    });
};

export const getMyPlaylists = ({ accessToken }) => {
    return appFetch('https://api.spotify.com/v1/me/playlists', {
        accessToken,
    });
};
