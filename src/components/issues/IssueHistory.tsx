import { FC, ReactNode } from 'react';
import SavedComment from '../../types/models/SavedComment';
import Stack from '../utility/Stack';
import IssueComment from './IssueComment';

interface Props {
    history: SavedComment[];
}

const IssueHistory: FC<Props> = (props) => {
    function groupHistoryByDay(): Map<Date, SavedComment[]> {
        const mappedHistory = new Map<Date, SavedComment[]>();
        props.history.forEach((comment) => {
            const day = new Date(
                comment.startTime.getUTCFullYear(),
                comment.startTime.getUTCMonth(),
                comment.startTime.getUTCDate(),
            );
            if (!mappedHistory.has(day)) mappedHistory.set(day, []);
            mappedHistory.get(day)?.push(comment);
        });

        return mappedHistory;
    }

    function renderDaySeparator(day: Date): ReactNode {
        return (
            <Stack orientation="row">
                <p>{day.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <hr />
            </Stack>
        );
    }

    function renderHistory(): ReactNode[] {
        if (props.history.length === 0) return [];
        const mappedHistory = groupHistoryByDay();

        const elements: ReactNode[] = [];
        mappedHistory.forEach((comments, day) => {
            elements.push(
                <Stack>
                    {renderDaySeparator(day)}
                    {comments.map((comment) => (
                        <IssueComment key={comment.issueId} comment={comment} />
                    ))}
                </Stack>,
            );
        });
        return elements;
    }

    return <Stack>{renderHistory()}</Stack>;
};

export default IssueHistory;
