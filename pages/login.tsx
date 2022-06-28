import Container from '../components/Utility/Container';
import UserProfile from '../components/UserProfile';
import { useUserContext } from '../LoginIntegration/UserContext';
import { Component } from '../types/Utility';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login: Component = () => {
    const router = useRouter();
    const userContext = useUserContext();

    useEffect(() => {
        if (userContext.user) {
            const returnUrl = (router.query.returnUrl as string) || '/';
            router.push(returnUrl);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userContext.user]);

    function signInWithGithub() {
        userContext.signInWithGithub();
    }

    return (
        <Container>
            {userContext.error && (
                <div>
                    <h4>There was an error while loggin in D:</h4>
                    <p>{userContext.error}</p>
                </div>
            )}
            {userContext.loading ? (
                <h4>Loading...</h4>
            ) : userContext.user ? (
                <div>
                    <div>Welcome {userContext.user.displayName}!</div>
                    <UserProfile user={userContext.user} />
                </div>
            ) : (
                <div>
                    <div>Can you login please</div>
                    <button onClick={signInWithGithub}>Continue with Github</button>
                </div>
            )}
        </Container>
    );
};

export default Login;
