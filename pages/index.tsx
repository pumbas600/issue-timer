import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import SignedInUser from '../components/user/SignedInUser';
import Container from '../components/utility/Container';
import { useUserContext } from '../login/UserContext';

const Home: NextPage = () => {
    const userContext = useUserContext();
    const router = useRouter();

    return <Container></Container>;
};

export default Home;
