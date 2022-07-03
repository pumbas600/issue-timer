import type { NextPage } from 'next';
import { useEffect } from 'react';
import Timer from '../components/Timer';
import Container from '../components/Utility/Container';
import { useUserContext } from '../login/UserContext';

const Home: NextPage = () => {
    const userContext = useUserContext();

    useEffect(() => {
        console.log('use effect');
        //getIssues();
    }, []);

    async function getIssues() {
        try {
            const res = await userContext.octokit?.request('GET /issues', {});
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Timer />
        </Container>
    );
};

export default Home;
