import Container from '../components/Utility/Container';
import { useUserContext } from '../login/UserContext';
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
import InfoButton from '../components/inputs/buttons/InfoButton';
import { canAccessPrivateRepos, setCanAccessPrivateRepos } from '../login/UserData';

const Login: Component = () => {
    const router = useRouter();
    const userContext = useUserContext();

    useEffect(() => {
        if (userContext.user && userContext.octokit) {
            const returnUrl = (router.query.returnUrl as string) || '/';
            router.push(returnUrl);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userContext.user]);

    function signInWithGithub() {
        userContext.signInWithGithub();
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

        return userContext.loading || (userContext.user && userContext.octokit) ? (
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

                <Card className="overflow-visible">
                    <Stack className="my-2 w-full gap-y-2">
                        {userContext.error && (
                            <div className="text-red-500 font-semibold leading-4">
                                <div className="flex gap-x-2 items-center">
                                    <FontAwesomeIcon icon={faWarning} size="lg" />
                                    {userContext.error}
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <Label
                                placement="right"
                                label={<div className="font-semibold">Allow access to private repositories</div>}
                            >
                                <Checkbox ring onClicked={setCanAccessPrivateRepos} checked={canAccessPrivateRepos()} />
                            </Label>
                            <InfoButton
                                className="text-gray-500"
                                info={
                                    <div className="w-[350px] whitespace-normal leading-5">
                                        GitHub only allows access to issues in private repositories with the{' '}
                                        <code className="font-semibold">repos</code> scope, which grants full access to
                                        repositories. As this level of access may concern some users, it is opt in.
                                    </div>
                                }
                            />
                        </div>
                        {renderState()}
                    </Stack>
                </Card>
            </div>
        </Container>
    );
};

export default Login;
