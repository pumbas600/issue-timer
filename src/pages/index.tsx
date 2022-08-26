import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import IssueTimer from '../components/issues/IssueTimer';
import IssueSelector from '../components/issues/IssueSelector';
import Container from '../components/utility/Container';
import Stack from '../components/utility/Stack';
import { useUserContext } from '../login/UserContext';
import Issue from '../types/models/Github';
import { SavedTime, SavedTimeNoId } from '../types/models/SavedTime';
import IssueHistory from '../components/issues/IssueHistory';
import { db } from '../firebase/FirebaseApp';
import { addDoc, collection, limit } from 'firebase/firestore';
import { getAllIssuesOrFetch } from '../data/GithubData';
import useHistoryList from '../hooks/useHistoryList';
import { getSavedTimes } from '../data/SavedTimeData';

const savedTimesRef = collection(db, 'savedtimes');

const Home: NextPage = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [timedIssues, setTimedIssues] = useState<Issue[]>([]);
    const history = useHistoryList<SavedTime>((savedTime) => savedTime.startTime);
    const userContext = useUserContext();

    useEffect(() => {
        if (userContext.isSignedIn()) {
            getAllIssuesOrFetch(userContext.octokit).then(setIssues);
            getSavedTimes(userContext.user.uid, limit(30)).then(history.addAll);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function deleteIssue(issueToDelete: Issue) {
        setTimedIssues((issues) => issues.filter((issue) => issue.id !== issueToDelete.id));
    }

    function saveTime(savedTime: SavedTimeNoId) {
        addDoc(savedTimesRef, savedTime).then((res) => {
            const newSavedTime = { ...savedTime, id: res.id };
            history.add(newSavedTime);
        });
    }

    return (
        <Container>
            <div className="flex flex-row gap-x-10">
                <Stack className="sm:w-1/2 w-full gap-y-2">
                    <IssueSelector
                        issues={issues}
                        onAddIssue={(issue) => setTimedIssues((issues) => [...issues, issue])}
                    />
                    {timedIssues.map((issue, index) => {
                        return (
                            <IssueTimer
                                key={index}
                                issue={issue}
                                onDelete={() => deleteIssue(issue)}
                                onSaveTime={(savedTime) => saveTime(savedTime)}
                            />
                        );
                    })}
                </Stack>
                <IssueHistory className="w-1/2 sm:flex hidden" history={history} />
            </div>
        </Container>
    );
};

export default Home;
