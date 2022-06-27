import type { NextPage } from 'next';
import Container from '../components/Container';
import { useUserContext } from '../context/UserContext';

const Home: NextPage = () => {
    const userContext = useUserContext();

    return <Container>{}</Container>;
};

export default Home;
