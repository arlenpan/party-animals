import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongAudioAnalysis, getSongAudioFeatures } from '~/data/spotify';
import prettifyMilliseconds from '~/lib/prettifyMilliseconds';
import { updateDeviceId } from '~/redux/spotifySlice';
import VolumeSlider from '../VolumeSlider/VolumeSlider';
import initializePlayer from './initializePlayer';

const WebPlayer = () => {
    const [player, setPlayer] = useState();
    const [isPaused, setPaused] = useState(true);
    const [isActive, setActive] = useState();
    const [currentTrack, setCurrentTrack] = useState();
    const [currentTrackMeta, setCurrentTrackMeta] = useState();
    const [currentVolume, setCurrentVolume] = useState();
    const [statePosition, setStatePosition] = useState();
    const [stateLastUpdated, setStateLastUpdated] = useState();
    const [displayTime, setDisplayTime] = useState();

    const { accessToken, deviceId } = useSelector((state) => state.spotify);
    const dispatch = useDispatch();
    const trackId = currentTrack && currentTrack.id;

    useEffect(() => {
        initializePlayer({ accessToken, onReady: onPlayerReady });
    }, []);

    useEffect(() => {
        if (trackId) onCurrentTrackChange(trackId);
    }, [trackId]);

    useEffect(() => {
        const timer = setInterval(() => {
            setDisplayTime(getSongPosition());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [stateLastUpdated, statePosition, isPaused]);

    const getSongPosition = () => {
        if (isPaused) return statePosition;
        const position = statePosition + (performance.now() - stateLastUpdated);
        return position > currentTrack.duration_ms ? currentTrack.duration_ms : position;
    };

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
            setCurrentTrack(state.track_window.current_track);
            setPaused(state.paused);
            setStatePosition(state.position);
            setStateLastUpdated(performance.now());
            player.getCurrentState().then((state) => setActive(!!state));
            player.getVolume().then((volume) => setCurrentVolume(volume));
        });

        player.connect();
    };

    const onCurrentTrackChange = async (trackId) => {
        const features = await getSongAudioFeatures({ accessToken, id: trackId });
        const analysis = await getSongAudioAnalysis({ accessToken, id: trackId });
        setCurrentTrackMeta({ features, analysis });
    };

    const handleVolumeChange = (volume) => {
        player.setVolume(volume / 100);
    };

    return (
        <div className="container">
            <div className="main-wrapper">
                {currentTrack && (
                    <>
                        {currentTrack.album && (
                            <img
                                src={currentTrack.album.images[0].url}
                                className="now-playing__cover"
                                alt=""
                            />
                        )}
                        <div className="now-playing__side">
                            <div className="now-playing__name">{currentTrack.name}</div>
                            {currentTrack.artists && (
                                <div className="now-playing__artist">
                                    {currentTrack.artists[0].name}
                                </div>
                            )}
                        </div>
                    </>
                )}

                <p>{isActive ? 'PLAYER ACTIVE' : 'PLAYER NOT ACTIVE'}</p>
                {displayTime && <p>{displayTime}</p>}
                {displayTime && <p>{prettifyMilliseconds(displayTime)}</p>}
                <button
                    type="button"
                    className="btn-spotify"
                    onClick={() => {
                        player.previousTrack();
                    }}
                >
                    &lt;&lt;
                </button>

                <button
                    type="button"
                    className="btn-spotify"
                    onClick={() => {
                        player.togglePlay();
                    }}
                >
                    {isPaused ? 'PLAY' : 'PAUSE'}
                </button>

                <button
                    type="button"
                    className="btn-spotify"
                    onClick={() => {
                        player.nextTrack();
                    }}
                >
                    &gt;&gt;
                </button>

                {currentVolume !== undefined && (
                    <VolumeSlider value={currentVolume * 100} onChange={handleVolumeChange} />
                )}

                {currentTrackMeta?.features &&
                    Object.entries(currentTrackMeta?.features).map(([key, value]) => (
                        <p key={key}>
                            {key}: {value}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default WebPlayer;
