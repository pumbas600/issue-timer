import Container from '../components/Utility/Container';
import UserProfile from '../components/UserProfile';
import { useUserContext } from '../context/UserContext';
import { Component } from '../types/Utility';

const Login: Component = () => {
    const userContext = useUserContext();

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
                    <button onClick={userContext.signInWithGithub}>Continue with Github</button>
                </div>
            )}
        </Container>
    );
};

export default Login;
