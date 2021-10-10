import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateToken } from '~/redux/spotifySlice';

const AuthPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { access_token } = router.query;

    // redirect from # query delimiter to ?
    useEffect(() => {
        if (!Object.keys(router.query).length) {
            router.replace(router.asPath.replace('#', '?'));
        }
    }, []);

    // access token in
    if (access_token) {
        dispatch(updateToken(access_token));
        router.replace('/');
    }

    return <div>Connecting...</div>;
};

export default AuthPage;
