import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import SignedInUser from '../components/user/SignedInUser';
import Container from '../components/utility/Container';
import { useUserContext } from '../login/UserContext';

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
            {userContext.user ? <SignedInUser user={userContext.user} /> : <p>Youre not logged in!</p>}

            <button onClick={logout}>Logout</button>
        </Container>
    );
};

export default Home;
