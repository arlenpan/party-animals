import appFetch from './fetch';

export const play = async ({ accessToken, deviceId, uri }) => {
    console.log('PLAYING', uri);
    return appFetch('https://api.spotify.com/v1/me/player/play', {
        query: { device_id: deviceId },
        method: 'PUT',
        body: { uris: [uri] },
        accessToken,
    });
};

export const searchSongs = async ({ accessToken, query }) => {
    if (!query) return [];
    const res = await appFetch('https://api.spotify.com/v1/search', {
        query: { q: encodeURIComponent(query), type: 'track' },
        accessToken,
    });
    return res;
};

export const getMyPlaylists = async ({ accessToken }) => {
    return appFetch('https://api.spotify.com/v1/me/playlists', { accessToken });
};

export const getSongAudioFeatures = async ({ accessToken, id }) => {
    return appFetch(`https://api.spotify.com/v1/audio-features/${id}`, { accessToken });
};

export const getSongAudioAnalysis = async ({ accessToken, id }) => {
    return appFetch(`https://api.spotify.com/v1/audio-analysis/${id}`, { accessToken });
};
