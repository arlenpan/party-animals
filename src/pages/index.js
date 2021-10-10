import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import WebPlayer from '~/components/WebPlayer';

const HomePage = () => {
    const router = useRouter();
    const accessToken = useSelector((state) => state.spotify.accessToken);

    const handleLoginClick = () => router.push('/api/spotify-login');

    return (
        <div>
            {!accessToken && <button onClick={handleLoginClick}>Login to Spotify</button>}
            {accessToken && <WebPlayer token={accessToken} />}
        </div>
    );
};

export default HomePage;
