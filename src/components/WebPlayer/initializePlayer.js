const initializePlayer = ({ accessToken, onReady }) => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
            name: 'Party Animals Web Player',
            getOAuthToken: (cb) => cb(accessToken),
        });
        if (onReady) onReady(player);
    };
};

export default initializePlayer;
