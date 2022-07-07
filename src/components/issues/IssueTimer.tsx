import { faCodePullRequest, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FC, ReactNode, useState } from 'react';
import Issue from '../../types/models/Github';
import SavedComment from '../../types/models/SavedComment';
import { capitalise } from '../../utility/Utility';
import Card from '../cards/Card';
import CardSeparator from '../cards/CardSeparator';
import IconButton from '../inputs/buttons/IconButton';
import Stack from '../utility/Stack';
import Timer from './Timer';

interface Props {
    issue: Issue;
    onDelete: VoidFunction;
    onSaveComment: (comment: SavedComment) => void;
}

export function issueTitle(issue: Issue): ReactNode {
    return (
        <Stack orientation="row" className="whitespace-nowrap">
            <FontAwesomeIcon
                className="mr-2 text-gray-800"
                icon={issue.pull_request ? faCodePullRequest : faCircleDot}
                size="sm"
            />
            {issue.repository && capitalise(issue.repository?.name) + '/'}
            <div className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden">{issue.title}</div>
        </Stack>
    );
}

const IssueTimer: FC<Props> = (props) => {
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [description, setDescription] = useState<string>('');

    function handleDescriptionUpdate(e: ChangeEvent<HTMLTextAreaElement>) {
        setDescription(e.target.value);
    }

    function handleTimerTogglePaused(isPaused: boolean) {
        if (!isPaused && !startTime) setStartTime(new Date());
    }

    function handleTimerRestarted(isPaused: boolean) {
        setStartTime(isPaused ? null : new Date());
    }

    function handlerTimerSave(ms: number) {
        if (!startTime) return;

        const comment: SavedComment = {
            issue: props.issue,
            ms: ms,
            startTime: startTime,
            endTime: new Date(),
            description: description,
        };

        props.onSaveComment(comment);
        setStartTime(null);
        setDescription('');
    }

    return (
        <Card className="overflow-visible">
            <Stack className="gap-y-2">
                <Stack orientation="row" className="flex-reverse">
                    <h5 className="w-full overflow-hidden">{issueTitle(props.issue)}</h5>
                    <IconButton icon={faTrash} className="text-red-500 bg-red-500" onClick={props.onDelete} />
                </Stack>
                <CardSeparator />
                <Timer
                    onTogglePause={(isPaused) => handleTimerTogglePaused(isPaused)}
                    onRestart={(isPaused) => handleTimerRestarted(isPaused)}
                    onSave={handlerTimerSave}
                />
                <textarea
                    className="w-full border border-gray-300 rounded-md p-1"
                    placeholder="Description of what's being done..."
                    onChange={handleDescriptionUpdate}
                    value={description}
                    // https://stackoverflow.com/questions/881085/count-the-number-of-occurrences-of-a-character-in-a-string-in-javascript
                    rows={Math.max((description?.match(/\n/g) || []).length + 1, 2)}
                />
            </Stack>
        </Card>
    );
};

export default IssueTimer;
