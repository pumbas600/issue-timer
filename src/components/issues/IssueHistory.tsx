import { FC, ReactNode } from 'react';
import { HistoryList } from '../../hooks/useHistoryList';
import { SavedTime } from '../../types/models/SavedTime';
import { ClassName } from '../../types/Props';
import Stack from '../utility/Stack';
import SavedIssueTime from './SavedIssueTime';

interface Props extends ClassName {
    history: HistoryList<SavedTime>;
}

const IssueHistory: FC<Props> = (props) => {
    function renderDaySeparator(day: Date): ReactNode {
        return (
            <Stack orientation="row" className="gap-x-2">
                <p className="whitespace-nowrap font-semibold">
                    {day.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <hr className="w-full border-gray-300" />
            </Stack>
        );
    }

    function renderHistory(): ReactNode[] {
        if (props.history.size() === 0) return [];

        return props.history.map((day, savedTimes) => {
            return (
                <Stack key={day.getTime()}>
                    {renderDaySeparator(day)}
                    {savedTimes.map((savedTime) => (
                        <SavedIssueTime key={savedTime.id} savedTime={savedTime} />
                    ))}
                </Stack>
            );
        });
    }

    return (
        <Stack className={props.className}>
            <h3 className="mb-3 text-blue-500">History</h3>
            {renderHistory()}
        </Stack>
    );
};

export default IssueHistory;
