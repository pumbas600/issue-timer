import { FC, ReactNode } from 'react';
import { SavedTime } from '../../types/models/SavedTime';
import { ClassName } from '../../types/Props';
import Stack from '../utility/Stack';
import SavedIssueTime from './SavedIssueTime';

interface Props extends ClassName {
    history: SavedTime[];
}

const IssueHistory: FC<Props> = (props) => {
    function groupHistoryByDay(): Map<number, SavedTime[]> {
        const mappedHistory = new Map<number, SavedTime[]>();
        props.history.forEach((savedTime) => {
            const day = new Date(
                savedTime.startTime.getUTCFullYear(),
                savedTime.startTime.getUTCMonth(),
                savedTime.startTime.getUTCDate(),
            ).getTime();
            if (!mappedHistory.has(day)) mappedHistory.set(day, []);
            mappedHistory.get(day)?.push(savedTime);
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
        mappedHistory.forEach((savedTimes, day) => {
            elements.push(
                <Stack key={day}>
                    {renderDaySeparator(new Date(day))}
                    {savedTimes.map((savedTime) => (
                        <SavedIssueTime key={savedTime.id} savedTime={savedTime} />
                    ))}
                </Stack>,
            );
        });
        return elements;
    }

    return (
        <Stack className={props.className}>
            <h3 className="mb-3 text-blue-500">History</h3>
            {renderHistory()}
        </Stack>
    );
};

export default IssueHistory;
