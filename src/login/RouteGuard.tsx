import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Component } from '../types/Utility';
import { useUserContext } from './UserContext';

// Taken from: https://jasonwatmore.com/post/2021/08/30/next-js-redirect-to-login-page-if-unauthenticated
const RouteGuard: Component = (props) => {
    const router = useRouter();
    const userContext = useUserContext();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        setAuthorized(false);
        const publicPaths = ['/login'];
        const path = router.asPath.split('?')[0];
        if (!userContext.isSignedIn() && !publicPaths.includes(path)) {
            if (!userContext.loading) {
                router.push({
                    pathname: '/login',
                    query: { returnUrl: router.asPath },
                });
            }
        } else {
            setAuthorized(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath]);

    return <>{authorized && props.children}</>;
};

export default RouteGuard;
