import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Container from '../components/utility/Container';
import { useUserContext } from '../login/UserContext';

const Home: NextPage = () => {
    // const userContext = useUserContext();

    useEffect(() => {
        console.log('use effect');
        //getIssues();
    }, []);

    // async function getIssues() {
    //     try {
    //         // const response = await octokit.request('/user', {});
    //         // console.log(response);
    //         console.log(await octokit.request('GET /issues', {}));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return <Container></Container>;
};

export default Home;
