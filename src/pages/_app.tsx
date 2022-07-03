import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '../login/UserContext';
import RouteGuard from '../login/RouteGuard';
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserContextProvider>
            <RouteGuard>
                <NavBar />
                <Component {...pageProps} />
            </RouteGuard>
        </UserContextProvider>
    );
}

export default MyApp;
