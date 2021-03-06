import { createContext, useState, useEffect, useContext } from 'react';
import { Component } from '../types/Utility';
import { onAuthStateChanged, User, signOut, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { Auth } from '../firebase/FirebaseApp';
import { canAccessPrivateRepos, clearStoredAccessToken, getStoredAccessToken, setStoredAccessToken } from './UserData';
import { Octokit } from '@octokit/core';

export interface UserContextProps {
    user: User | null;
    loading: boolean;
    error: string;
    octokit: Octokit | null;
    logoutUser: () => Promise<void>;
    signInWithGithub: VoidFunction;
}

const UserContext = createContext<UserContextProps>({
    user: null,
    loading: false,
    error: '',
    octokit: null,
    logoutUser: async () => {},
    signInWithGithub: () => {},
});

export const useUserContext = () => useContext(UserContext);

function createOctokit(accessToken: string): Octokit {
    return new Octokit({
        auth: accessToken,
    });
}

export const UserContextProvider: Component = (props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [octokit, setOctokit] = useState<Octokit | null>(null);

    useEffect(() => {
        setLoading(true);
        const accessToken = getStoredAccessToken();
        if (accessToken) {
            setOctokit(createOctokit(accessToken));
        }

        const unsubscribe = onAuthStateChanged(Auth, (user) => {
            setUser(user);
            setError('');
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    async function signInWithGithub() {
        setLoading(true);
        try {
            const provider = new GithubAuthProvider();
            provider.addScope('read:user');

            // The repo scope is the only way to get issues in private repositories,
            // but it also gives access to sensitive information like the codebase so only use this if specified.
            if (canAccessPrivateRepos()) {
                provider.addScope('repo');
            } else {
                provider.addScope('public_repo');
            }

            const res = await signInWithPopup(Auth, provider);
            const credential = GithubAuthProvider.credentialFromResult(res);
            if (credential?.accessToken) {
                setStoredAccessToken(credential.accessToken);
                setOctokit(createOctokit(credential.accessToken));
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    function logoutUser(): Promise<void> {
        clearStoredAccessToken();
        return signOut(Auth);
    }

    const contextValue: UserContextProps = {
        user,
        loading,
        error,
        octokit,
        logoutUser,
        signInWithGithub,
    };

    return <UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>;
};
