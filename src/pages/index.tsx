import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import IssueTimer from '../components/issues/Issue';
import IssueSelector from '../components/issues/IssueSelector';
import Container from '../components/utility/Container';
import Stack from '../components/utility/Stack';
import { useUserContext } from '../login/UserContext';
import Issue from '../types/models/Github';

const Home: NextPage = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [timedIssues, setTimedIssues] = useState<Issue[]>([]);
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
            <Stack className="sm:w-[500px] w-full gap-y-2">
                <IssueSelector issues={issues} onAddIssue={(issue) => setTimedIssues((issues) => [...issues, issue])} />
                {timedIssues.map((issue) => {
                    return <IssueTimer key={issue.id} issue={issue} />;
                })}
            </Stack>
        </Container>
    );
};

export default Home;
