import Container from '../components/utility/Container';
import { ALLOW_PRIVATE_REPOS, useUserContext } from '../login/UserContext';
import { Component } from '../types/Utility';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Card from '../components/cards/Card';
import Button from '../components/inputs/buttons/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Styles } from '../styles/Styles';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import Stack from '../components/utility/Stack';
import Checkbox from '../components/inputs/checkbox/Checkbox';
import Label from '../components/inputs/Label';

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

    function allowPrivateRepos(allowed: boolean) {
        if (allowed) localStorage.setItem(ALLOW_PRIVATE_REPOS, 'true');
        else localStorage.removeItem(ALLOW_PRIVATE_REPOS);
    }

    function loadingIcon(): JSX.Element {
        return (
            <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        );
    }

    function renderState(): JSX.Element {
        const sharedStyles = `w-full py-2 border ${Styles.secondary.border.light} flex items-center gap-x-2 justify-center bg-gray-700`;

        return userContext.loading || userContext.user ? (
            <div className={`${sharedStyles} btn text-white`}>
                {loadingIcon()}
                Loading...
            </div>
        ) : (
            <Button className={`${sharedStyles} hover:bg-gray-800`} onClick={signInWithGithub}>
                <FontAwesomeIcon icon={faGithub} size="lg" />
                Continue with GitHub
            </Button>
        );
    }

    return (
        <Container>
            <div className="mx-auto lg:w-[400px] w-full mt-20">
                <div className="flex justify-center items-baseline my-5">
                    <h4 className="font-bold">Sign in to&nbsp;</h4>
                    <h3 className="text-blue-500">Issue Tracker</h3>
                </div>

                <Card>
                    <Stack className="my-2 w-full gap-y-2">
                        {userContext.error && (
                            <div className="text-red-500 font-semibold leading-4">
                                <div className="flex gap-x-2 items-center">
                                    <FontAwesomeIcon icon={faWarning} size="lg" />
                                    {userContext.error}
                                </div>
                            </div>
                        )}
                        <div>
                            <Label label={<div className="font-semibold">Allow access to private repos</div>}>
                                <Checkbox
                                    ring
                                    onClicked={allowPrivateRepos}
                                    checked={localStorage.getItem(ALLOW_PRIVATE_REPOS) === 'true'}
                                />
                            </Label>
                        </div>
                        {renderState()}
                    </Stack>
                </Card>
            </div>
        </Container>
    );
};

export default Login;
