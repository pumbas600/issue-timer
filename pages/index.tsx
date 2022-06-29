import { Octokit } from '@octokit/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Container from '../components/utility/Container';
import { useUserContext } from '../login/UserContext';
import test from './api/Github';

const Home: NextPage = () => {
    const userContext = useUserContext();
    const router = useRouter();

    const octokit = new Octokit({
        auth: userContext.accessToken,
    });

    test(octokit);

    return <Container></Container>;
};

export default Home;
