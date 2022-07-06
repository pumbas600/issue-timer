import { FC, ReactNode } from 'react';
import SavedComment from '../../types/models/SavedComment';
import Stack from '../utility/Stack';
import IssueComment from './IssueComment';

interface Props {
    history: SavedComment[];
}

const IssueHistory: FC<Props> = (props) => {
    function groupHistoryByDay(): Map<number, SavedComment[]> {
        const mappedHistory = new Map<number, SavedComment[]>();
        props.history.forEach((comment) => {
            const day = new Date(
                comment.startTime.getUTCFullYear(),
                comment.startTime.getUTCMonth(),
                comment.startTime.getUTCDate(),
            ).getTime();
            if (!mappedHistory.has(day)) mappedHistory.set(day, []);
            mappedHistory.get(day)?.push(comment);
        });

        return mappedHistory;
    }

    function renderDaySeparator(day: Date): ReactNode {
        return (
            <Stack orientation="row" className="gap-x-2">
                <p className="whitespace-nowrap">
                    {day.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <hr className="w-full border-gray-300" />
            </Stack>
        );
    }

    function renderHistory(): ReactNode[] {
        if (props.history.length === 0) return [];
        const mappedHistory = groupHistoryByDay();

        const elements: ReactNode[] = [];
        mappedHistory.forEach((comments, day) => {
            elements.push(
                <Stack key={day}>
                    {renderDaySeparator(new Date(day))}
                    {comments.map((comment) => (
                        <IssueComment key={comment.endTime.getTime()} comment={comment} />
                    ))}
                </Stack>,
            );
        });
        return elements;
    }

    return (
        <Stack className="sm:flex hidden">
            <h3 className="mb-3 text-blue-500">History</h3>
            {renderHistory()}
        </Stack>
    );
};

export default IssueHistory;
