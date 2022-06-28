import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '../LoginIntegration/UserContext';
import RouteGuard from '../LoginIntegration/RouteGuard';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserContextProvider>
            <RouteGuard>
                <Component {...pageProps} />
            </RouteGuard>
        </UserContextProvider>
    );
}

export default MyApp;
