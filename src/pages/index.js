import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Search, SearchResults } from '~/components/Search';
import WebPlayer from '~/components/WebPlayer';
import { play, searchSongs } from '~/data/spotify';

const HomePage = () => {
    const router = useRouter();
    const { accessToken, deviceId } = useSelector((state) => state.spotify);
    const [results, setResults] = useState([]);

    const handleLoginClick = () => router.push('/api/spotify-login');

    const handleSearch = (query) => {
        searchSongs({ accessToken, query }).then((res) => {
            if (res && res.tracks) {
                setResults(res?.tracks.items);
            }
        });
    };

    const handleSearchResultClick = (item) => {
        play({ accessToken, uri: item.uri, deviceId });
    };

    return (
        <div>
            {!accessToken && <button onClick={handleLoginClick}>Login to Spotify</button>}
            {accessToken && (
                <>
                    <Search onSearch={handleSearch} placeholder="Search Song..." />
                    <SearchResults results={results} onClickResult={handleSearchResultClick} />
                    <WebPlayer />
                </>
            )}
        </div>
    );
};

export default HomePage;
