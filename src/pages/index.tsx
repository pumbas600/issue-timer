import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import IssueSelector from '../components/issues/IssueSelector';
import Timer from '../components/issues/Timer';
import Container from '../components/Utility/Container';
import { useUserContext } from '../login/UserContext';
import Issue from '../types/models/Github';

const Home: NextPage = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const userContext = useUserContext();

    useEffect(() => {
        getIssues();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getIssues() {
        try {
            const res = await userContext.octokit?.request('GET /issues', {});
            if (res) {
                setIssues(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <IssueSelector issues={issues} />
            <Timer />
        </Container>
    );
};

export default Home;
