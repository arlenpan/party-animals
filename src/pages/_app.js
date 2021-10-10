import '~/styles/globals.css';
import { Provider } from 'react-redux';
import store from '~/redux/store';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {
    return (
        <CookiesProvider>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </CookiesProvider>
    );
}

export default MyApp;
