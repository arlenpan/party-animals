import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { play } from '~/data/spotify';
import { updateDeviceId } from '~/redux/spotifySlice';
import initializePlayer from './initializePlayer';

const WebPlayer = ({ token }) => {
    const [player, setPlayer] = useState();
    const [currentTrack, setTrack] = useState();
    const [isPaused, setPaused] = useState(true);
    const [isActive, setActive] = useState();

    const { accessToken, deviceId } = useSelector((state) => state.spotify);
    const dispatch = useDispatch();

    const readyToPlay = accessToken && deviceId && player;

    useEffect(() => {
        initializePlayer({ accessToken, onReady: onPlayerReady });
    }, []);

    const onPlayerReady = (player) => {
        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID:', device_id);
            dispatch(updateDeviceId(device_id));
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Going offline:', device_id);
            dispatch(updateDeviceId(null));
        });

        player.addListener('player_state_changed', (state) => {
            if (!state) return;

            console.log(state);
            setTrack(state.track_window.current_track);
            setPaused(state.paused);
            player.getCurrentState().then((state) => setActive(!!state));
        });

        player.connect();
    };

    const handlePlayClick = () => {
        if (readyToPlay) {
            play({
                accessToken,
                deviceId,
                uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
            });
        }
    };

    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    {currentTrack && (
                        <>
                            <img
                                src={currentTrack.album.images[0].url}
                                className="now-playing__cover"
                                alt=""
                            />
                            <div className="now-playing__side">
                                <div className="now-playing__name">{currentTrack.name}</div>
                                <div className="now-playing__artist">
                                    {currentTrack.artists[0].name}
                                </div>
                            </div>
                        </>
                    )}

                    {isActive ? 'PLAYER ACTIVE' : 'PLAYER NOT ACTIVE'}
                    <button
                        className="btn-spotify"
                        onClick={() => {
                            player.previousTrack();
                        }}
                    >
                        &lt;&lt;
                    </button>

                    <button
                        className="btn-spotify"
                        onClick={() => {
                            player.togglePlay();
                        }}
                    >
                        {isPaused ? 'PLAY' : 'PAUSE'}
                    </button>

                    <button
                        className="btn-spotify"
                        onClick={() => {
                            player.nextTrack();
                        }}
                    >
                        &gt;&gt;
                    </button>

                    {readyToPlay && <button onClick={handlePlayClick}>PLAY STUFF</button>}
                </div>
            </div>
        </>
    );
};

export default WebPlayer;
