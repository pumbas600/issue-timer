import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '../login/UserContext';
import RouteGuard from '../login/RouteGuard';
import NavBar from '../components/NavBar';
import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const customTheme = extendTheme(withDefaultColorScheme({ colorScheme: "orange"}))

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserContextProvider>
            <ChakraProvider theme={customTheme}>
                <RouteGuard>
                    <NavBar />
                    <Component {...pageProps} />
                </RouteGuard>
            </ChakraProvider>
        </UserContextProvider>
    );
}

export default MyApp;
