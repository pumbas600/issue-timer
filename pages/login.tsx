import Container from '../components/utility/Container';
import SignedInUser from '../components/user/SignedInUser';
import { useUserContext } from '../login/UserContext';
import { Component } from '../types/Utility';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Card from '../components/cards/Card';
import CardSection from '../components/cards/CardSection';
import Button from '../components/buttons/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Login: Component = () => {
    const router = useRouter();
    const userContext = useUserContext();

    function setError(err: string) {
        userContext.error = err;
    }

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
            <Card className="mx-auto w-1/2">
                <CardSection top className="bg-highlight">
                    <h3 className="text-highlight my-2">Login</h3>
                </CardSection>
                {userContext.error && <div className="text-red-500">{userContext.error}</div>}
                <div className="my-5">
                    <Button
                        variant="secondary"
                        className="w-full py-2.5"
                        onClick={signInWithGithub}
                        disabled={userContext.error.length !== 0}
                    >
                        <FontAwesomeIcon icon={faGithub} size="lg" className="mr-2" />
                        Continue with Github
                    </Button>
                </div>
            </Card>

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
                    <SignedInUser user={userContext.user} />
                </div>
            ) : (
                <div></div>
            )}
        </Container>
    );
};

export default Login;
