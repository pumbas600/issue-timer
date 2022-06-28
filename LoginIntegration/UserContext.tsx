import { createContext, useState, useEffect, useContext } from 'react';
import { Component } from '../types/Utility';
import { onAuthStateChanged, User, signOut, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { Auth } from '../pages/api/firebase/FirebaseApp';

export interface UserContextProps {
    user: User | null;
    loading: boolean;
    error: string;
    logoutUser: () => Promise<void>;
    signInWithGithub: VoidFunction;
}

const UserContext = createContext<UserContextProps>({
    user: null,
    loading: false,
    error: '',
    logoutUser: async () => {},
    signInWithGithub: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: Component = (props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
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
            //provider.addScope('');
            const res = await signInWithPopup(Auth, provider);
            console.log(res);
        } catch (error) {
            console.log(error);
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    function logoutUser(): Promise<void> {
        return signOut(Auth);
    }

    const contextValue: UserContextProps = {
        user,
        loading,
        error,
        logoutUser,
        signInWithGithub,
    };

    return <UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>;
};
