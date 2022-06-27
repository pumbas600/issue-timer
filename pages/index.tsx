import type { NextPage } from 'next';
import Container from '../components/Utility/Container';
import { useUserContext } from '../context/UserContext';

const Home: NextPage = () => {
    const userContext = useUserContext();

    return <Container>{}</Container>;
};

export default Home;
