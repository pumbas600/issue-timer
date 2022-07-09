import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import IssueTimer from '../components/issues/IssueTimer';
import IssueSelector from '../components/issues/IssueSelector';
import Container from '../components/utility/Container';
import Stack from '../components/utility/Stack';
import { useUserContext } from '../login/UserContext';
import Issue from '../types/models/Github';
import { SavedTime } from '../types/models/SavedTime';
import IssueHistory from '../components/issues/IssueHistory';
import { db } from '../firebase/FirebaseApp';
import { collection } from 'firebase/firestore';

const savedTimesCollection = collection(db, 'savedtimes');

const Home: NextPage = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [timedIssues, setTimedIssues] = useState<Issue[]>([]);
    const [savedTimes, setSavedTimes] = useState<SavedTime[]>([]);
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

    function deleteIssue(issueToDelete: Issue) {
        setTimedIssues((issues) => issues.filter((issue) => issue.id !== issueToDelete.id));
    }

    function saveTime(comment: SavedTime) {
        setSavedTimes((comments) => [...comments, comment]);
    }

    return (
        <Container>
            <div className="flex flex-row gap-x-10">
                <Stack className="sm:w-1/2 w-full gap-y-2">
                    <IssueSelector
                        issues={issues}
                        onAddIssue={(issue) => setTimedIssues((issues) => [...issues, issue])}
                    />
                    {timedIssues.map((issue) => {
                        return (
                            <IssueTimer
                                key={issue.id}
                                issue={issue}
                                onDelete={() => deleteIssue(issue)}
                                onSaveTime={(comment) => saveTime(comment)}
                            />
                        );
                    })}
                </Stack>
                <IssueHistory className="w-1/2 sm:flex hidden" history={savedTimes} />
            </div>
        </Container>
    );
};

export default Home;
