import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import UserProfile from '../components/UserProfile';
import Container from '../components/Utility/Container';
import { useUserContext } from '../LoginIntegration/UserContext';

const Home: NextPage = () => {
    const userContext = useUserContext();
    const router = useRouter();

    function logout() {
        userContext.logoutUser().then(() => {
            router.push({ pathname: '/login' });
        });
    }

    return (
        <Container>
            {userContext.user ? <UserProfile user={userContext.user} /> : <p>Youre not logged in!</p>}

            <button onClick={logout}>Logout</button>
        </Container>
    );
};

export default Home;
